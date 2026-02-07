import "./App.css";
import Canvas from "./components/canvas/Canvas";
import AppearancePanel from "./components/appearancePanel/AppearancePanel";
import { useState, useEffect, useMemo } from "react";

interface Images {
  [key: string]: string[];
}

interface SelectedStyles {
  [key: string]: string;
}

function App() {
  const [images, setImages] = useState<Images>({});
  const [activeAppearance, setActiveAppearance] =
    useState<string>("backgrounds");
  const [selectedStyles, setSelectedStyles] = useState<SelectedStyles>({});

  /* =========================
     Helpers
  ========================= */

  const getStyleName = (path: string) => path.split("/").at(-1)!.split(".")[0];

  /* =========================
     Derived Data
  ========================= */

  const appearances = useMemo(() => Object.keys(images), [images]);

  const appearanceStyles = useMemo(() => {
    return images[activeAppearance]?.map(getStyleName) ?? [];
  }, [images, activeAppearance]);

  const activeStyle = selectedStyles[activeAppearance];

  const canvasImages = useMemo(() => {
    return Object.keys(selectedStyles).map(
      (appearance) => `/${appearance}/${selectedStyles[appearance]}.png`,
    );
  }, [selectedStyles]);

  /* =========================
     Handlers
  ========================= */

  const handleAppearanceChange = (appearance: string) => {
    if (appearance === activeAppearance) return;
    setActiveAppearance(appearance);
  };

  const updateCanvas = (styleId: string) => {
    if (styleId === selectedStyles[activeAppearance]) return;

    setSelectedStyles((prev) => ({
      ...prev,
      [activeAppearance]: styleId,
    }));
  };

  const handleRandomize = () => {
    const randomStyles: SelectedStyles = {};

    Object.keys(images).forEach((appearance) => {
      const styles = images[appearance];
      const random = styles[Math.floor(Math.random() * styles.length)];

      randomStyles[appearance] = getStyleName(random);
    });

    setSelectedStyles(randomStyles);
  };

  /* =========================
     Fetch Data
  ========================= */

  useEffect(() => {
    fetch("/images.json")
      .then((res) => res.json())
      .then((data: Images) => {
        setImages(data);

        const initialStyles: SelectedStyles = {};
        Object.keys(data).forEach((appearance) => {
          initialStyles[appearance] = getStyleName(data[appearance][0]);
        });

        setSelectedStyles(initialStyles);
      });
  }, []);

  /* =========================
     Render
  ========================= */

  return (
    <main>
      <h1 className="title">ALPACA GENERATOR</h1>

      <section className="container">
        <Canvas images={canvasImages} onRandomClick={handleRandomize} />

        <div className="panel">
          <AppearancePanel
            title="accessories the alpaca's"
            data={appearances}
            activeControl={activeAppearance}
            onClick={handleAppearanceChange}
          />

          <AppearancePanel
            title="style"
            data={appearanceStyles}
            activeControl={activeStyle}
            onClick={updateCanvas}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
