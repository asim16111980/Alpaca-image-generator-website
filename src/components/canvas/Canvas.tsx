import "./Canvas.css";
import { useRef, useEffect } from "react";
import loadImage from "../../utils/loadImage";

function Canvas({ images,onRandomClick }: { images: Array<string>, onRandomClick: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "alpaca.png";
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    (async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const src of images) {
        const img = await loadImage(src);
        ctx.drawImage(img, 0, 0, 450, 450);
      }
    })();
  }, [images]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="canvas"
        width={450}
        height={450}
      ></canvas>
      <div className="buttons">
        <button onClick={onRandomClick}>Random</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
}

export default Canvas;
