import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    contentSecurityPolicy: {
        directives: {
            scriptSrc: ["'self'", 'https://accounts.google.com'],
        },
    },
};

export default nextConfig;
