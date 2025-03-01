import { ClerkProvider as Provider } from '@clerk/nextjs';

export const ClerkProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <Provider>{children}</Provider>;
};
