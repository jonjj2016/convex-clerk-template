// 'use client';

// import { useClerk } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import Script from 'next/script';
// import { useEffect } from 'react';
// import { Button } from '../components/ui/button';

// console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
// // Add clerk to Window to avoid type errors
// declare global {
//     interface Window {
//         google: any;
//     }
// }

// export function CustomGoogleOneTap({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const clerk = useClerk();
//     const router = useRouter();

//     useEffect(() => {
//         // Will show the One Tap UI after two seconds
//         const timeout = setTimeout(() => oneTap(), 5000);
//         return () => {
//             clearTimeout(timeout);
//         };
//     }, []);

//     const oneTap = () => {
//         const { google } = window;
//         if (google) {
//             google.accounts.id.initialize({
//                 client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//                 callback: async (response: any) => {
//                     console.log('Google One Tap Response:', response);
//                     call(response.credential);
//                 },
//                 auto_select: false, // Prevent auto-login
//                 cancel_on_tap_outside: false, // Prevent accidental closing
//                 use_fedcm_for_prompt: true, // ✅ Enable FedCM support
//             });

//             google.accounts.id.prompt((notification: any) => {
//                 console.log('Google One Tap Notification:', notification);
//             });
//         }
//     };

//     const call = async (token: any) => {
//         try {
//             const res = await clerk.authenticateWithGoogleOneTap({
//                 token,
//             });

//             await clerk.handleGoogleOneTapCallback(res, {
//                 signInFallbackRedirectUrl: '/example-fallback-path',
//             });
//         } catch (error) {
//             router.push('/sign-in');
//         }
//     };

//     return (
//         <>
//             <Script
//                 src="https://accounts.google.com/gsi/client"
//                 strategy="afterInteractive"
//                 onLoad={() => console.log('✅ Google One Tap script loaded')}
//             />
//             {/* <Script
//                 src="https://accounts.google.com/gsi/client"
//                 strategy="afterInteractive"
//                 onLoad={() => {
//                     console.log('Google ne tap loaded');
//                 }}
//             >
//                 Some{' '}
//             </Script> */}
//             <Button
//                 type="button"
//                 onClick={oneTap}
//                 className="bg-blue-500 text-white p-2 rounded"
//             >
//                 Trigger Google One Tap
//             </Button>
//             {children}
//         </>
//     );
// }

'use client';

import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';

export default function OauthSignIn() {
    const { signIn } = useSignIn();

    if (!signIn) return null;

    const signInWith = (strategy: OAuthStrategy) => {
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

    // Render a button for each supported OAuth provider
    // you want to add to your app. This example uses only Google.
    return (
        <div>
            <button onClick={() => signInWith('oauth_google')}>
                Sign in with Google
            </button>
        </div>
    );
}
