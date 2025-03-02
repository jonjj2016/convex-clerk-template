import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useSignIn as useClerkSignin } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SignInSchema } from '../schemas';
import { useAuthModal } from './use-auth-modal';

export const useSignIn = () => {
    const {
        open,
        isOpen: isModalOpen,
        close: closeModal,
    } = useAuthModal({ path: 'sign-in' });
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
        showTwoFactor,
        register,
        errors,
        form,
    };
};
