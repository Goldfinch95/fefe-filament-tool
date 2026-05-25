/* COMPONENTE: Botón circular que aparece en las esquinas de cada ColorCard */

import { ReactNode } from "react";


interface Props {
  icon: ReactNode;
  onClick: () => void;
  btnBg: string;    // fondo dinámico según el color de la tarjeta
  btnBorder: string; // borde dinámico según el color de la tarjeta
}

const AlertButton = ({ icon, onClick, btnBg, btnBorder }: Props) => {
  return (
    <button
      className="size-7 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 border"
      style={{ background: btnBg, borderColor: btnBorder }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {icon}
    </button>
  );
};

export default AlertButton;