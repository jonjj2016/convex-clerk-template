import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useSignIn as useClerkSignin } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SignInSchema } from '../schemas';
import { useAuthModal } from './use-auth-modal';

export const useSignIn = () => {
    const { open, isOpen: isModalOpen, close: closeModal } = useAuthModal();
    const { isLoaded, signIn } = useClerkSignin();

    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const signInWith = (strategy: OAuthStrategy) => {
        if (!signIn) return null;
        return signIn
            .authenticateWithRedirect({
                strategy,
                redirectUrl: '/sign-up/sso-callback',
                redirectUrlComplete: '/',
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err: any) => {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.log(err.errors);
                console.error(err, null, 2);
            });
    };
    const {
        reset,
        formState: { errors },
        handleSubmit,
        register,
    } = form;
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const initiateLoginFlow = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            const res = await signIn?.create({ identifier: email, password });
            if (res?.status === 'complete') {
                toast('Success', { description: 'Welcome back!' });
                reset();
                isModalOpen ? closeModal() : null;
                setIsPending(false);
                return res;
            } else {
                throw new Error(JSON.stringify(res, null, 2));
            }
        } catch (error) {
            setIsPending(false);
            toast('Error', {
                description: (error as Error).message || 'Something went wrong',
            });
        }
    };

    const onAuthenticateUser = handleSubmit(async (values) => {
        initiateLoginFlow({ email: values.email, password: values.password });
    });

    return {
        onAuthenticateUser,
        isPending,
        signInWithGoogle: () => signInWith('oauth_google'),
        showTwoFactor,
        register,
        errors,
        form,
    };
};
