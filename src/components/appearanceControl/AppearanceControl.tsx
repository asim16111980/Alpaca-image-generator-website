import "./AppearanceControl.css";
import type { ReactNode } from "react";

type Props = {
  id: string;
  onClick: (id: string) => void;
  activeControl: string;
  children: ReactNode;
};

export default function AppearanceControl({
  id,
  onClick,
  activeControl,
  children,
}: Props) {
  return (
    <button
      id={id}
      className={`appearance-control ${activeControl === id ? "active" : ""}`}
      onClick={() => onClick(id)}
    >
      {children}
    </button>
  );
}
