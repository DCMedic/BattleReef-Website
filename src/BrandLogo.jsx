const assets = {
  mark: {
    src: '/brand/battlereef-logo-mark-640.webp',
    srcSet: '/brand/battlereef-logo-mark-320.webp 320w, /brand/battlereef-logo-mark-640.webp 640w, /brand/battlereef-logo-mark-1024.webp 1024w',
    width: 1024,
    height: 895,
  },
  wordmark: {
    src: '/brand/battlereef-logo-full-960.webp',
    srcSet: '/brand/battlereef-logo-full-480.webp 480w, /brand/battlereef-logo-full-960.webp 960w, /brand/battlereef-logo-full-1536.webp 1408w',
    width: 1408,
    height: 713,
  },
}

export default function BrandLogo({
  variant = 'wordmark',
  className,
  decorative = false,
  priority = false,
  sizes,
}) {
  const asset = assets[variant]
  return (
    <img
      className={className}
      src={asset.src}
      srcSet={asset.srcSet}
      sizes={sizes ?? (variant === 'mark' ? '(max-width: 760px) 300px, 430px' : '(max-width: 760px) 190px, 235px')}
      width={asset.width}
      height={asset.height}
      alt={decorative ? '' : 'BattleReef'}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
