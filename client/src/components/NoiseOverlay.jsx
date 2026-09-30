export default function NoiseOverlay() {
  return (
    <div className="noise-overlay-container" aria-hidden="true">
      <svg className="noise-overlay-svg">
        <filter id="fractalNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fractalNoise)" />
      </svg>
    </div>
  )
}
