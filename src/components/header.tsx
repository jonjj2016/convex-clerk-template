import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useAuthModal } from '../features/auth/hooks/use-auth-modal';

export const Header = () => {
    const { open: openSignInModal } = useAuthModal();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container>
                <nav className="flex h-16 items-center justify-between">
                    <ul className="flex gap-10 text-sm font-medium">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                    </ul>

                    <div className="flex items-center justify-between gap-6">
                        <ThemeToggle />
                        <Button
                            onClick={() => {
                                openSignInModal();
                            }}
                            size="sm"
                        >
                            Sign in
                        </Button>
                        {/* <SignedOut>
                            <SignInButton mode="modal">
                            </SignInButton>
                        </SignedOut> */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>
            </Container>
        </header>
    );
};
