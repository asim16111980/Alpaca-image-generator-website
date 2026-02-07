import ControlButton from "../appearanceControl/AppearanceControl";
import "./AppearancePanel.css";

type Props = {
  title: string;
  data: Array<string>;
  activeControl: string;
  onClick: (id: string) => void;
};

export default function AppearancePanel({
  title,
  data,
  activeControl,
  onClick,
}: Props) {
  return (
    <div className="wrapper">
      <h2 className="wrapper-title">{title}</h2>
      <div className="wrapper-content">
        {data &&
          data.map((key, index) => {
            return (
              <ControlButton
                id={key}
                key={index}
                activeControl={activeControl}
                onClick={onClick}
              >
                {key}
              </ControlButton>
            );
          })}
      </div>
    </div>
  );
}
