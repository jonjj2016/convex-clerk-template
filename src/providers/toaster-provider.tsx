import { useTheme } from 'next-themes';
import { Toaster } from '../components/ui/sonner';

export const ToasterProvider = () => {
    const { resolvedTheme } = useTheme();

    return (
        <Toaster
            richColors
            closeButton
            position="top-right"
            theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        />
    );
};
