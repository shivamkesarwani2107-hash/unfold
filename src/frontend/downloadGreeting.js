/**
 * High-quality Greeting PNG Generator and Downloader
 * Renders the personalized greeting onto a high-res 1200x1500 canvas and triggers PNG download.
 */

const getThemeColors = (occasion = '') => {
  const occ = occasion.toLowerCase();
  if (occ.includes('birthday')) {
    return {
      bgGrad: ['#fff1f2', '#fdf2f8', '#fff7ed'],
      accent: '#e11d48',
      cardBorder: '#fecdd3',
      emoji: '🎂',
      subtitle: 'A Birthday Surprise For You',
    };
  }
  if (occ.includes('love')) {
    return {
      bgGrad: ['#fdf2f8', '#fae8ff', '#fce7f3'],
      accent: '#db2777',
      cardBorder: '#fbcfe8',
      emoji: '💗',
      subtitle: 'From The Heart, Straight To You',
    };
  }
  if (occ.includes('anniversary')) {
    return {
      bgGrad: ['#fffbeb', '#fef3c7', '#fff7ed'],
      accent: '#d97706',
      cardBorder: '#fde68a',
      emoji: '💍',
      subtitle: 'Celebrating Your Beautiful Story',
    };
  }
  if (occ.includes('friend')) {
    return {
      bgGrad: ['#f0fdf4', '#ecfdf5', '#f0f9ff'],
      accent: '#059669',
      cardBorder: '#a7f3d0',
      emoji: '🫶',
      subtitle: 'For My Favourite Person',
    };
  }
  if (occ.includes('festival')) {
    return {
      bgGrad: ['#fff7ed', '#ffedd5', '#fef3c7'],
      accent: '#ea580c',
      cardBorder: '#fed7aa',
      emoji: '🪔',
      subtitle: 'Festive Wishes & Warmth',
    };
  }
  if (occ.includes('wedding')) {
    return {
      bgGrad: ['#faf5ff', '#f3e8ff', '#fdf2f8'],
      accent: '#7c3aed',
      cardBorder: '#e9d5ff',
      emoji: '💐',
      subtitle: 'A Beautiful New Beginning',
    };
  }
  if (occ.includes('achievement')) {
    return {
      bgGrad: ['#fefce8', '#fef9c3', '#fef3c7'],
      accent: '#ca8a04',
      cardBorder: '#fef08a',
      emoji: '🏆',
      subtitle: 'Celebrating Your Big Milestone',
    };
  }
  if (occ.includes('distance')) {
    return {
      bgGrad: ['#f0f9ff', '#e0f2fe', '#fdf2f8'],
      accent: '#0284c7',
      cardBorder: '#bae6fd',
      emoji: '✈️',
      subtitle: 'Close In Heart, Miles Apart',
    };
  }
  return {
    bgGrad: ['#fff1f2', '#fdf2f8', '#fff7ed'],
    accent: '#e11d48',
    cardBorder: '#fecdd3',
    emoji: '💌',
    subtitle: 'A Special Surprise For You',
  };
};

const wrapText = (ctx, text, maxWidth) => {
  const lines = [];
  const paragraphs = (text || '').split('\n');

  for (const para of paragraphs) {
    if (para.trim() === '') {
      lines.push('');
      continue;
    }
    const words = para.split(' ');
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
  }
  return lines;
};

const loadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn('Could not load image for canvas render, rendering fallback.');
      resolve(null);
    };
    img.src = src;
  });
};

export const generateGreetingImageBlob = async (greeting) => {
  const {
    occasion = 'Birthday',
    recipient = 'Someone Special',
    sender = 'You',
    message = 'Wishing you happiness and love always!',
    photo = '',
    age = '',
  } = greeting;

  const width = 1200;
  const height = 1500;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const theme = getThemeColors(occasion);

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, theme.bgGrad[0]);
  bgGrad.addColorStop(0.5, theme.bgGrad[1]);
  bgGrad.addColorStop(1, theme.bgGrad[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Decorative circles in corners
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.beginPath();
  ctx.arc(80, 80, 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width - 60, height - 60, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. Inner Card Border
  const pad = 60;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  const cardRadius = 36;

  ctx.save();
  ctx.shadowColor = 'rgba(225, 29, 72, 0.08)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 15;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(pad, pad, cardW, cardH, cardRadius);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = theme.cardBorder;
  ctx.beginPath();
  ctx.roundRect(pad, pad, cardW, cardH, cardRadius);
  ctx.stroke();
  ctx.restore();

  // 4. Header Badge
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = theme.accent;
  ctx.fillText(`✦  ${theme.subtitle.toUpperCase()}  ✦`, width / 2, pad + 70);

  // 5. Occasion Emoji & Heading
  ctx.font = '72px system-ui, apple color emoji, segoe ui emoji';
  ctx.fillText(theme.emoji, width / 2, pad + 155);

  ctx.font = 'bold 54px Georgia, serif';
  ctx.fillStyle = '#1c1917';
  const heading = `${occasion === 'Birthday' ? 'Happy Birthday' : occasion}, ${recipient}!`;
  ctx.fillText(heading, width / 2, pad + 230);
  ctx.restore();

  let currentY = pad + 280;

  // 6. Optional Photo
  const loadedPhoto = await loadImage(photo);
  if (loadedPhoto) {
    const photoBoxSize = 320;
    const photoX = (width - photoBoxSize) / 2;
    const photoY = currentY;

    ctx.save();
    // Rounded clip for photo
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoBoxSize, photoBoxSize, 24);
    ctx.clip();

    // Aspect fill image drawing
    const scale = Math.max(photoBoxSize / loadedPhoto.width, photoBoxSize / loadedPhoto.height);
    const drawW = loadedPhoto.width * scale;
    const drawH = loadedPhoto.height * scale;
    const drawX = photoX + (photoBoxSize - drawW) / 2;
    const drawY = photoY + (photoBoxSize - drawH) / 2;
    ctx.drawImage(loadedPhoto, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Photo border
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoBoxSize, photoBoxSize, 24);
    ctx.stroke();
    ctx.restore();

    currentY += photoBoxSize + 40;
  } else {
    currentY += 20;
  }

  // 7. Message Box Background
  const msgBoxMargin = pad + 60;
  const msgBoxW = width - msgBoxMargin * 2;
  const msgMaxTextW = msgBoxW - 80;

  ctx.font = '400 28px Georgia, serif';
  const lines = wrapText(ctx, message, msgMaxTextW);
  const lineHeight = 44;
  const textBlockHeight = lines.length * lineHeight;
  const msgBoxH = Math.max(160, textBlockHeight + 70);

  ctx.save();
  ctx.fillStyle = '#fafaf9';
  ctx.beginPath();
  ctx.roundRect(msgBoxMargin, currentY, msgBoxW, msgBoxH, 20);
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#f5f5f4';
  ctx.beginPath();
  ctx.roundRect(msgBoxMargin, currentY, msgBoxW, msgBoxH, 20);
  ctx.stroke();

  // Render message lines
  ctx.fillStyle = '#292524';
  ctx.textAlign = 'center';
  let textY = currentY + 48;
  for (const line of lines) {
    if (line !== '') {
      ctx.fillText(line, width / 2, textY);
    }
    textY += lineHeight;
  }
  ctx.restore();

  currentY += msgBoxH + 40;

  // 8. Age Note (if applicable)
  if (age) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillStyle = '#78716c';
    ctx.fillText(`✨ Celebrating ${age} wonderful years ✨`, width / 2, currentY);
    ctx.restore();
    currentY += 45;
  }

  // 9. Sender Signature
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'italic 34px Georgia, serif';
  ctx.fillStyle = theme.accent;
  ctx.fillText(`With love, ${sender} ♡`, width / 2, currentY + 20);
  ctx.restore();

  // 10. Footer Brand Mark
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '600 20px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#a8a29e';
  ctx.fillText('unfold · Little surprises. Big memories.', width / 2, height - pad - 35);
  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
  });
};

/**
 * Downloads the personalized greeting PNG to the user's device
 */
export const downloadGreetingPNG = async (greeting) => {
  const blob = await generateGreetingImageBlob(greeting);
  if (!blob) {
    throw new Error('Failed to generate greeting image.');
  }

  const safeOccasion = (greeting.occasion || 'greeting').toLowerCase().replace(/[^a-z0-9]/g, '_');
  const safeRecipient = (greeting.recipient || 'special_one').toLowerCase().replace(/[^a-z0-9]/g, '_');
  const filename = `unfold-${safeOccasion}-${safeRecipient}.png`;

  // Check if Web Share API with file support is available on mobile device
  const file = new File([blob], filename, { type: 'image/png' });
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `Unfold Greeting for ${greeting.recipient}`,
        text: `Here is your personalized greeting surprise! 💌`,
      });
      return { success: true, method: 'share', filename };
    } catch (shareError) {
      if (shareError.name !== 'AbortError') {
        console.warn('Web Share failed, falling back to standard download:', shareError);
      }
    }
  }

  // Standard browser file download
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();

  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 1000);

  return { success: true, method: 'download', filename };
};
