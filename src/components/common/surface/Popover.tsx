import { createPortal } from 'react-dom';

interface IPopoverProps {
  isOpen?: boolean;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export default function Popover({
  isOpen = false,
  trigger,
  content,
}: IPopoverProps) {
  return (
    <>
      {trigger}
      {isOpen && createPortal(content, document.body)}
    </>
  );
}
