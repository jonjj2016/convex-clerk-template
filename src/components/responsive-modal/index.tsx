// import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

import { useIsMobile } from '@/hooks/use-mobile';

interface IResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export const ResponsiveModal = ({
    children,
    open,
    onOpenChange,
}: IResponsiveModalProps) => {
    const isMobile = useIsMobile();
    // const isDesktop = useMedia("(min-width:1024px)", true);
    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-auto hide-scrollbar max-h-[85vh] animate-appear">
                    <DialogTitle className="hidden"></DialogTitle>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="animate-appear overflow-auto hide-scrollbar max-h-[85vh]">
                    <DialogTitle className="hidden"></DialogTitle>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
};
