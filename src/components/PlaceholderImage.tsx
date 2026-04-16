"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackEmoji?: string;
  fallbackBg?: string;
  style?: React.CSSProperties;
  className?: string;
  priority?: boolean;
}

/**
 * Smart image component:
 * - Shows the real image if it exists at the given path
 * - Falls back to a styled emoji placeholder if the image fails to load
 * - Drop-in replacement: just add the real image file and it auto-switches
 */
export default function PlaceholderImage({
  src, alt, width, height, fallbackEmoji = "📷", fallbackBg = "#F3F4F6",
  style, className, priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          aspectRatio: `${width}/${height}`,
          background: fallbackBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: Math.min(width, height) * 0.3,
          borderRadius: "inherit",
          ...style,
        }}
        aria-label={alt}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "inherit",
        ...style,
      }}
    />
  );
}
