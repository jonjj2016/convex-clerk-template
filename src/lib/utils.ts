import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const createSlugsFromName = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^-|-$)+/g, '');
};
export const combineName = (
    user: {
        firstName?: string;
        lastName?: string;
    } | null
) => {
    if (!user) return 'Anonymous';
    if (!user.firstName && !user.lastName) return 'Anonymous';
    return `${user.firstName} ${user.lastName}`;
};
export const formatDate = (date: number) => {
    const formatter = new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return formatter.format(date);
};
