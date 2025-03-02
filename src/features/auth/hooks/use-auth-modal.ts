import { parseAsBoolean, useQueryState } from "nuqs";

export const useAuthModal = ({ path }: { path: string }) => {
  const [isOpen, setIsOpen] = useQueryState(
    path,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
