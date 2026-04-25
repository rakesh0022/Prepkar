import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Optimized Image component with blur placeholder and WebP support
 * Automatically handles lazy loading and responsive sizing
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  style = {},
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
      className={className}
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'cover',
        ...style,
      }}
      quality={90}
      loading={priority ? undefined : 'lazy'}
    />
  );
}
