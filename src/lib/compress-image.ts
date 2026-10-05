/** Stay well under Vercel’s ~4.5 MB request body limit after multipart overhead. */
export const maxPostImageBytes = 3 * 1024 * 1024;

const MAX_DIMENSION = 1600;
const SKIP_BELOW_BYTES = 400 * 1024;
const QUALITIES = [0.82, 0.7, 0.55];

/**
 * Shrinks a photo in the browser before upload so the request stays well under
 * the platform body limit. Falls back to the original file on any failure.
 */
export async function compressImage(file: File): Promise<File> {
  if (file.size <= SKIP_BELOW_BYTES && file.type === "image/jpeg") {
    return file;
  }

  try {
    const source = await rasterize(file);
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(source.width, source.height),
    );
    const width = Math.round(source.width * scale);
    const height = Math.round(source.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      source.close();
      return file;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    source.draw(context, width, height);
    source.close();

    let best: Blob | null = null;
    for (const quality of QUALITIES) {
      const blob = await canvasToJpeg(canvas, quality);
      if (!blob) continue;
      best = blob;
      if (blob.size <= maxPostImageBytes) break;
    }

    if (!best || best.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "parca-gorseli";
    return new File([best], `${baseName}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
}

async function rasterize(file: File): Promise<{
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
  close: () => void;
}> {
  try {
    const bitmap = await createImageBitmap(file);
    return {
      width: bitmap.width,
      height: bitmap.height,
      draw: (ctx, width, height) => ctx.drawImage(bitmap, 0, 0, width, height),
      close: () => bitmap.close(),
    };
  } catch {
    const url = URL.createObjectURL(file);
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Image decode failed"));
      element.src = url;
    });
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      draw: (ctx, width, height) => ctx.drawImage(image, 0, 0, width, height),
      close: () => URL.revokeObjectURL(url),
    };
  }
}
