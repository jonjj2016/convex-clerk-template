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
                    {children}
                    <ToasterProvider />
                </ThemeProvider>
            </ConvexClientProvider>
        </ClerkProvider>
    );
};
