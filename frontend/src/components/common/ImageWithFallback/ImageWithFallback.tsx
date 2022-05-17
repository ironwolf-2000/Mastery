export const ImageWithFallback = ({
  className,
  src,
  mediaType = 'image/webp',
  fallbackSrc,
  alt = '',
}: IImageWithFallbackProps) => {
  return (
    <picture className={className}>
      <source srcSet={src} type={mediaType} />
      <img src={fallbackSrc} alt={alt} style={{ width: '100%' }} />
    </picture>
  );
};

interface IImageWithFallbackProps {
  className?: string;
  src: string;
  mediaType?: string;
  fallbackSrc: string;
  alt?: string;
}
