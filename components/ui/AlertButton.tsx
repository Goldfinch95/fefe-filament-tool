import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

const AlertButton = ({ icon, onClick }: Props) => {
  return (
    <button
      className="size-4 sm:size-12 bg-none sm:bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 transform hover:scale-110"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {icon}
    </button>
  );
}

export default AlertButton;