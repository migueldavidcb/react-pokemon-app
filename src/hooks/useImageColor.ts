import { useEffect, useRef, useState } from "react";

export const useImageColor = (imageUrl?: string) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [color, setColor] = useState<string>("#ffffff");

    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = () => {
            if (!canvasRef.current) {
                canvasRef.current = document.createElement("canvas");
            }

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!canvas || !ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < imageData.length; i += 4) {
                const alpha = imageData[i + 3];
                const rVal = imageData[i];
                const gVal = imageData[i + 1];
                const bVal = imageData[i + 2];

                if (alpha > 100 && (rVal + gVal + bVal) > 60) {
                    r += rVal;
                    g += gVal;
                    b += bVal;
                    count++;
                }
            }

            if (count > 0) {
                const lighten = (value: number, factor: number) =>
                    Math.min(Math.floor(value * factor), 255);

                r = lighten(r / count, 1.2);
                g = lighten(g / count, 1.2);
                b = lighten(b / count, 1.2);

                setColor(`rgb(${r}, ${g}, ${b})`);
            }
        };
    }, [imageUrl]);

    return color;
};