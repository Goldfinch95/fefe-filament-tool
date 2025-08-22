import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ReactNode, isValidElement } from 'react';

interface Props {
  icon: IconDefinition | ReactNode;
  onClick: () => void;
}

const AlertButton = ({ icon, onClick }: Props) => {
  return (
    <button
      className="w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 transform hover:scale-110"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {isValidElement(icon)
        ? icon
        : <FontAwesomeIcon icon={icon as IconDefinition} size="lg" />}
    </button>
  );
}

export default AlertButton;