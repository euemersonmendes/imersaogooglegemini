interface Props {
  className?: string;
}

// Marca do Gemini: faísca de quatro pontas com o degradê oficial (azul → roxo → rosa → âmbar).
export function LogoGemini({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" role="img" aria-label="Logo do Gemini">
      <defs>
        <linearGradient id="gemini-spark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4E7DF9" />
          <stop offset="35%" stopColor="#9177C7" />
          <stop offset="70%" stopColor="#D96570" />
          <stop offset="100%" stopColor="#F2A60C" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gemini-spark)"
        d="M50 0 C52.5 27 73 47.5 100 50 C73 52.5 52.5 73 50 100 C47.5 73 27 52.5 0 50 C27 47.5 47.5 27 50 0 Z"
      />
    </svg>
  );
}
