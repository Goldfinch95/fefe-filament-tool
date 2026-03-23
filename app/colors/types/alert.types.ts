import { Color } from "./colors.types";

/* interfaz de alerta  */
export interface AlertProps {
  open: boolean;
  onClose: () => void;
  alertSelectedIndex: number | null;
  colors: Color[];
  setColors: (colors: Color[]) => void;
  setAlertSelectedIndex: (index: number | null) => void;
}

// extension de AlertProps con valores previos, para componente Alert_Revert
export interface AlertRevertProps extends AlertProps {
  previousValues: Record<string, number>;
  setPreviousValues: (prev: Record<string, number>) => void;
}