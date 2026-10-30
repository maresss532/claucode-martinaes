// Kit visual alegre (público: mamás con hijos): colores, tipografías, íconos sólidos y helpers de animación
import { loadFont } from "@remotion/fonts";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Paleta: https://coolors.co/palette/ffbe0b-fb5607-ff006e-8338ec-3a86ff (colores planos, sin degradés)
export const YELLOW = "#FFBE0B";
export const ORANGE = "#FB5607";
export const PINK = "#FF006E";
export const PURPLE = "#8338EC";
export const BLUE = "#3A86FF";
export const DARK = "#1F1A33";
export const WHITE = "#FFFFFF";
export const CREAM = "#FFF8EC";
export const GRID = "#F3E6CF";
// Alias para no repetir colores fuera de la paleta
export const CORAL = ORANGE;
export const TEAL = BLUE;
export const GREEN = YELLOW;
export const RAINBOW = [YELLOW, ORANGE, PINK, PURPLE, BLUE];

export const HEAD = "Fredoka";
export const BODY = "Montserrat";

loadFont({ family: HEAD, url: staticFile("fonts/fredoka-latin-700-normal.woff2"), weight: "700" });
loadFont({ family: HEAD, url: staticFile("fonts/fredoka-latin-500-normal.woff2"), weight: "500" });
loadFont({ family: BODY, url: staticFile("fonts/montserrat-latin-300-normal.woff2"), weight: "300" });

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Entrada con rebote (pop)
export const usePop = (delay: number, bouncy = true) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: bouncy ? { damping: 11, stiffness: 170, mass: 0.7 } : { damping: 200 },
  });
};

// Salida: 1 → 0 en los últimos `len` frames
export const useExit = (dur: number, len = 10) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [dur - len, dur], [1, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
};

export const head = (size: number, color = DARK): React.CSSProperties => ({
  fontFamily: HEAD,
  fontWeight: 700,
  fontSize: size,
  color,
  lineHeight: 1.05,
  letterSpacing: 0,
});
export const body = (size: number, color = DARK): React.CSSProperties => ({
  fontFamily: BODY,
  fontWeight: 300,
  fontSize: size,
  color,
  lineHeight: 1.15,
});

// Elemento que entra con pop (escala + subida)
export const Pop: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties; from?: "up" | "scale" }> = ({
  delay,
  children,
  style,
  from = "scale",
}) => {
  const p = usePop(delay);
  const transform = from === "up" ? `translateY(${(1 - p) * 60}px)` : `scale(${p})`;
  return (
    <div style={{ opacity: Math.min(1, p * 2), transform, ...style }}>{children}</div>
  );
};

// Tarjeta blanca superior (estilo referencia)
export const Card: React.FC<{
  dur: number;
  width: number;
  top?: number;
  children: React.ReactNode;
  pad?: string;
  accent?: string;
}> = ({ dur, width, top = 150, children, pad = "44px 48px", accent = CORAL }) => {
  const p = usePop(0);
  const out = useExit(dur);
  return (
    <AbsoluteFill style={{ alignItems: "center", top }}>
      <div
        style={{
          width,
          background: WHITE,
          borderRadius: 48,
          padding: pad,
          border: `6px solid ${accent}`,
          boxShadow: `0 14px 0 ${accent}, 0 30px 60px rgba(0,0,0,0.25)`,
          transform: `scale(${p * out}) translateY(${(1 - p) * 40}px)`,
          opacity: Math.min(1, p * 2) * out,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Pantalla completa con revelado circular
export const Full: React.FC<{
  dur: number;
  bg: string;
  children: React.ReactNode;
  grid?: boolean;
  exitAt?: number;
}> = ({ dur, bg, children, grid, exitAt }) => {
  const frame = useCurrentFrame();
  const end = exitAt ?? dur;
  const open = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const close = interpolate(frame, [end - 10, end], [1, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  const r = Math.min(open, close) * 120;
  return (
    <AbsoluteFill style={{ clipPath: `circle(${r}% at 50% 50%)`, background: bg }}>
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage: `linear-gradient(${GRID} 2px, transparent 2px), linear-gradient(90deg, ${GRID} 2px, transparent 2px)`,
            backgroundSize: "108px 108px",
            backgroundPosition: "center",
          }}
        />
      ) : null}
      {children}
    </AbsoluteFill>
  );
};

// Número de paso en círculo
export const StepBadge: React.FC<{ n: string; size?: number; delay?: number; inverted?: boolean }> = ({
  n,
  size = 110,
  delay = 0,
  inverted,
}) => {
  const p = usePop(delay);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        background: inverted ? DARK : YELLOW,
        color: inverted ? YELLOW : DARK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...head(size * 0.42, inverted ? YELLOW : DARK),
        transform: `scale(${p}) rotate(${(1 - p) * -90}deg)`,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
};

// ---------- Íconos sólidos de dos tonos ----------
type IconProps = { size: number; a?: string; b?: string };

export const HouseIcon: React.FC<IconProps> = ({ size, a = DARK, b = YELLOW }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 8 L94 46 L84 46 L84 92 L16 92 L16 46 L6 46 Z" fill={a} />
    <rect x="40" y="62" width="20" height="30" rx="3" fill={b} />
    <rect x="66" y="16" width="10" height="18" fill={a} />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ size, a = YELLOW, b = DARK }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130">
    <path d="M50 4C26 4 8 22 8 46c0 32 42 78 42 78s42-46 42-78C92 22 74 4 50 4z" fill={a} />
    <circle cx="50" cy="46" r="17" fill={b} />
  </svg>
);

export const CheckBadge: React.FC<IconProps & { progress?: number }> = ({ size, a = YELLOW, b = DARK, progress = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill={a} />
    <path
      d="M28 52 L44 67 L73 35"
      fill="none"
      stroke={b}
      strokeWidth={11}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ size, a = DARK, b = YELLOW }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M8 14 Q8 8 14 8 L50 8 L94 52 Q97 55 94 58 L58 94 Q55 97 52 94 L8 50 Z" fill={a} />
    <circle cx="30" cy="30" r="9" fill={b} />
    <text x="60" y="66" textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize="34" fill={b} transform="rotate(45 60 60)">
      $
    </text>
  </svg>
);

export const PercentIcon: React.FC<IconProps> = ({ size, a = DARK, b = WHITE }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill={a} />
    <circle cx="34" cy="34" r="10" fill={b} />
    <circle cx="66" cy="66" r="10" fill={b} />
    <path d="M70 26 L30 74" stroke={b} strokeWidth={9} strokeLinecap="round" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size, a = DARK, b = WHITE }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M62 64 L90 92" stroke={a} strokeWidth={14} strokeLinecap="round" />
    <circle cx="40" cy="40" r="32" fill={a} />
    <circle cx="40" cy="40" r="21" fill={b} />
  </svg>
);

export const TargetIcon: React.FC<IconProps & { arrow?: number }> = ({ size, a = DARK, b = YELLOW, arrow = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
    <circle cx="46" cy="54" r="42" fill={a} />
    <circle cx="46" cy="54" r="29" fill={WHITE} />
    <circle cx="46" cy="54" r="17" fill={b} />
    <g transform={`translate(${(1 - arrow) * 60} ${(1 - arrow) * -60})`} opacity={arrow > 0 ? 1 : 0}>
      <path d="M46 54 L92 8" stroke={a} strokeWidth={7} strokeLinecap="round" />
      <path d="M80 6 L94 6 L94 20" fill="none" stroke={a} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);
