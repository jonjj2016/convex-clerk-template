'use client';
import { ClerkProvider } from './clerk-provider';
import { ConvexClientProvider } from './convex-provider';
import { ThemeProvider } from './theme-provider';
import { ToasterProvider } from './toaster-provider';

export const RootProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ClerkProvider>
            <ConvexClientProvider>
                <ThemeProvider
                    attribute={'class'}
                    defaultTheme={'system'}
                    enableSystem={true}
                    disableTransitionOnChange={true}
                >
                    <body className={`antialiased`}>{children}</body>
                    <ToasterProvider />
                </ThemeProvider>
            </ConvexClientProvider>
        </ClerkProvider>
    );
};
