const assets = {
  mark: {
    src: '/brand/battlereef-logo-mark-v2-640.webp',
    srcSet: '/brand/battlereef-logo-mark-v2-320.webp 320w, /brand/battlereef-logo-mark-v2-640.webp 640w, /brand/battlereef-logo-mark-v2-1024.webp 1024w',
    width: 1024,
    height: 886,
  },
  wordmark: {
    src: '/brand/battlereef-logo-full-v2-960.webp',
    srcSet: '/brand/battlereef-logo-full-v2-480.webp 480w, /brand/battlereef-logo-full-v2-960.webp 960w, /brand/battlereef-logo-full-v2-1407.webp 1407w',
    width: 1407,
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
