'use client';

import { useAuth } from '@clerk/clerk-react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';

export const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);
console.log(
    '🚀 ~ process.env.NEXT_PUBLIC_CONVEX_URL:',
    process.env.NEXT_PUBLIC_CONVEX_URL
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            {children}
        </ConvexProviderWithClerk>
    );
}
