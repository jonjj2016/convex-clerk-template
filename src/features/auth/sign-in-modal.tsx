'use client';

import { ResponsiveModal } from '@/components/responsive-modal';

import { useAuthModal } from './hooks/use-auth-modal';
import LoginFrom from './signin-form';

export const SignInModal = () => {
    const { open, isOpen, setIsOpen, close } = useAuthModal({
        path: 'sign-in',
    });
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <div className="w-full py-10 px-6">
                <LoginFrom />
            </div>
        </ResponsiveModal>
    );
};
