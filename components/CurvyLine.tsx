

export const CurvyLine = () => {
  return (
<div className="absolute h-64">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 256" className="w-full h-full">
    <path d="M68,126 C189,38 162,296 317,206" fill="none" stroke="url(#gradient)" stroke-width="8" />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="red" />
        <stop offset="100%" stop-color="blue" />
      </linearGradient>
    </defs>
  </svg>
</div>

  

  )
}
