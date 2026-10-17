
import { jsPDF } from "jspdf";

export const generateGreetingImageBlob = async (greeting = {}) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1500;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create greeting image.");
  }

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 1500);
  gradient.addColorStop(0, "#fff1f2");
  gradient.addColorStop(1, "#f5f3ff");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 1500);

  // Decorative border
  ctx.strokeStyle = "#e11d48";
  ctx.lineWidth = 8;
  ctx.strokeRect(35, 35, 1130, 1430);

  ctx.textAlign = "center";

  // Occasion
  ctx.fillStyle = "#be123c";
  ctx.font = "bold 54px Arial";
  ctx.fillText(
    String(greeting.occasion || "A Special Wish").slice(0, 40),
    600,
    140,
    1000
  );

  // Decorative emoji
  ctx.font = "100px Arial";
  ctx.fillText("💌", 600, 270);

  // Recipient
  ctx.fillStyle = "#881337";
  ctx.font = "bold 64px Arial";
  ctx.fillText(
    `Dear ${String(greeting.recipient || "Friend").slice(0, 35)}`,
    600,
    390,
    1000
  );

  // Optional photo
  if (greeting.photo && typeof greeting.photo === "string") {
    try {
      const photo = new Image();
      photo.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        photo.onload = resolve;
        photo.onerror = reject;
        photo.src = greeting.photo;
      });

      const maxWidth = 360;
      const maxHeight = 360;
      const scale = Math.min(
        maxWidth / photo.width,
        maxHeight / photo.height,
        1
      );

      const width = photo.width * scale;
      const height = photo.height * scale;

      ctx.drawImage(
        photo,
        (1200 - width) / 2,
        430,
        width,
        height
      );
    } catch {
      // Continue creating the greeting if the photo cannot load.
    }
  }

  // Message
  ctx.textAlign = "center";
  ctx.fillStyle = "#374151";
  ctx.font = "36px Arial";

  const words = String(
    greeting.message || "Wishing you lots of happiness!"
  ).split(/\s+/);

  const maxWidth = 900;
  const lineHeight = 54;
  const lines = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;

    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) lines.push(line);

  // Keep message within the canvas.
  const maxLines = 9;
  const visibleLines = lines.slice(0, maxLines);
  const startY = greeting.photo ? 880 : 600;

  visibleLines.forEach((text, index) => {
    ctx.fillText(text, 600, startY + index * lineHeight, maxWidth);
  });

  // Sender
  ctx.fillStyle = "#be123c";
  ctx.font = "bold 38px Arial";
  ctx.fillText(
    `With love, ${String(greeting.sender || "You").slice(0, 50)}`,
    600,
    1330,
    1000
  );

  // Convert to PNG blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not generate PNG image."));
      }
    }, "image/png");
  });
};

export const downloadGreetingPNG = async (greeting) => {
  const blob = await generateGreetingImageBlob(greeting);
  const fileName = "unfold-greeting.png";

  // Share on supported mobile browsers.
  if (typeof navigator.share === "function" && typeof File !== "undefined") {
    try {
      const file = new File([blob], fileName, {
        type: "image/png",
      });

      if (
        typeof navigator.canShare !== "function" ||
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "My Unfold Greeting",
          text: "A special greeting made with Unfold 💌",
        });
        return;
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      // Fall back to normal download.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const downloadGreetingPDF = async (greeting) => {
  const blob = await generateGreetingImageBlob(greeting);

  const imageData = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(new Error("Could not prepare PDF image."));
    reader.readAsDataURL(blob);
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(
    imageData,
    "PNG",
    0,
    0,
    pageWidth,
    pageHeight
  );

  const recipient = String(greeting.recipient || "friend")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_");

  pdf.save(`unfold-greeting-${recipient}.pdf`);
};
