import { ClerkProvider } from "./clerk-provider";

export const RootProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <ClerkProvider>{children}</ClerkProvider>;
};
