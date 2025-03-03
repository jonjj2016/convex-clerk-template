'use client';

import { ModalProvider } from '@/providers/modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToasterProvider } from '@/providers/toaster-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
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
                            <NuqsAdapter>
                                <ModalProvider />
                                <Header />
                                <main className="grow flex-1">{children}</main>
                                <Footer />
                            </NuqsAdapter>
                            <ToasterProvider />
                        </ThemeProvider>
                    </body>
                </ConvexClientProvider>
            </ClerkProvider>
        </html>
    );
}
