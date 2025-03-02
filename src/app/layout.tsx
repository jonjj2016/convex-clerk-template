'use client';

import { ThemeProvider } from '@/providers/theme-provider';
import { ToasterProvider } from '@/providers/toaster-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ConvexClientProvider } from '../providers/convex-provider';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
            <ClerkProvider>
                <ConvexClientProvider>
                    <body className={`antialiased`}>
                        <ThemeProvider
                            attribute={'class'}
                            defaultTheme={'system'}
                            enableSystem={true}
                            disableTransitionOnChange={true}
                        >
                            <Header />
                            <main className="grow flex-1">{children}</main>
                            <Footer />
                            <ToasterProvider />
                        </ThemeProvider>
                    </body>
                </ConvexClientProvider>
            </ClerkProvider>
        </html>
    );
}
