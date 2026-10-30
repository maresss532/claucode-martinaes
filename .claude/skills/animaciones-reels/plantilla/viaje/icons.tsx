// Íconos sólidos y coloridos para el paquete de viaje
import React from "react";
import { useCurrentFrame } from "remotion";
import { BLUE, CORAL, DARK, GREEN, HEAD, ORANGE, PINK, PURPLE, TEAL, WHITE, YELLOW } from "./kit";

type S = { size: number };

export const CalendarIcon: React.FC<S> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="8" y="16" width="84" height="76" rx="14" fill={WHITE} stroke={DARK} strokeWidth="5" />
    <path d="M8 30 Q8 16 22 16 L78 16 Q92 16 92 30 L92 38 L8 38 Z" fill={CORAL} stroke={DARK} strokeWidth="5" />
    <rect x="26" y="6" width="9" height="20" rx="4" fill={DARK} />
    <rect x="65" y="6" width="9" height="20" rx="4" fill={DARK} />
    <text x="50" y="35" textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize="17" fill={WHITE}>
      NOV
    </text>
    {[0, 1, 2].map((i) => (
      <rect key={i} x={20 + i * 22} y="48" width="16" height="14" rx="4" fill={[YELLOW, TEAL, PINK][i]} />
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={i} x={20 + i * 22} y="68" width="16" height="14" rx="4" fill={i === 1 ? PURPLE : "#EFEAF7"} />
    ))}
  </svg>
);

export const FamilyIcon: React.FC<S> = ({ size }) => (
  <svg width={size * 1.4} height={size} viewBox="0 0 140 100">
    {/* mamá */}
    <circle cx="44" cy="22" r="15" fill={ORANGE} />
    <path d="M22 96 Q22 44 44 44 Q66 44 66 96 Z" fill={PINK} />
    {/* nene */}
    <circle cx="92" cy="40" r="12" fill={ORANGE} />
    <path d="M74 96 Q74 58 92 58 Q110 58 110 96 Z" fill={BLUE} />
    {/* nena */}
    <circle cx="124" cy="52" r="10" fill={ORANGE} />
    <path d="M110 96 Q110 66 124 66 Q138 66 138 96 Z" fill={TEAL} />
  </svg>
);

export const HeartIcon: React.FC<S & { color?: string }> = ({ size, color = CORAL }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 88 C20 66 6 50 6 32 C6 18 17 8 30 8 C40 8 46 14 50 20 C54 14 60 8 70 8 C83 8 94 18 94 32 C94 50 80 66 50 88 Z" fill={color} />
  </svg>
);

export const GiftIcon: React.FC<S> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="12" y="44" width="76" height="50" rx="8" fill={PINK} />
    <rect x="6" y="30" width="88" height="20" rx="8" fill={YELLOW} />
    <rect x="44" y="30" width="12" height="64" fill={PURPLE} />
    <path d="M50 30 C36 4 14 14 26 28 Z M50 30 C64 4 86 14 74 28 Z" fill={PURPLE} />
  </svg>
);

// Vuelta al mundo que gira (Parque de la Costa)
export const FerrisIcon: React.FC<S> = ({ size }) => {
  const frame = useCurrentFrame();
  const rot = frame * 1.6;
  const cabins = [CORAL, YELLOW, TEAL, BLUE, PINK, GREEN, ORANGE, PURPLE];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M50 50 L28 96 M50 50 L72 96" stroke={DARK} strokeWidth="6" strokeLinecap="round" />
      <g transform={`rotate(${rot} 50 46)`}>
        <circle cx="50" cy="46" r="34" fill="none" stroke={DARK} strokeWidth="5" />
        {cabins.map((c, i) => {
          const a = (i / cabins.length) * Math.PI * 2;
          return <line key={i} x1="50" y1="46" x2={50 + Math.cos(a) * 34} y2={46 + Math.sin(a) * 34} stroke={DARK} strokeWidth="3" />;
        })}
      </g>
      {cabins.map((c, i) => {
        const a = (i / cabins.length) * Math.PI * 2 + (rot * Math.PI) / 180;
        return <circle key={i} cx={50 + Math.cos(a) * 34} cy={46 + Math.sin(a) * 34} r="8" fill={c} stroke={DARK} strokeWidth="2.5" />;
      })}
      <circle cx="50" cy="46" r="6" fill={DARK} />
    </svg>
  );
};

export const PenguinIcon: React.FC<S> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <ellipse cx="50" cy="56" rx="30" ry="38" fill={DARK} />
    <ellipse cx="50" cy="62" rx="20" ry="28" fill={WHITE} />
    <circle cx="41" cy="38" r="5" fill={WHITE} />
    <circle cx="59" cy="38" r="5" fill={WHITE} />
    <circle cx="42" cy="39" r="2.5" fill={DARK} />
    <circle cx="58" cy="39" r="2.5" fill={DARK} />
    <path d="M44 46 L56 46 L50 54 Z" fill={ORANGE} />
    <ellipse cx="38" cy="94" rx="9" ry="4" fill={ORANGE} />
    <ellipse cx="62" cy="94" rx="9" ry="4" fill={ORANGE} />
    <path d="M20 56 Q8 70 18 80" stroke={DARK} strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M80 56 Q92 70 82 80" stroke={DARK} strokeWidth="8" fill="none" strokeLinecap="round" />
  </svg>
);

export const CityIcon: React.FC<S> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="8" y="40" width="24" height="56" rx="4" fill={BLUE} />
    <rect x="36" y="14" width="28" height="82" rx="4" fill={PURPLE} />
    <rect x="68" y="50" width="24" height="46" rx="4" fill={TEAL} />
    {[0, 1, 2, 3, 4].map((r) =>
      [0, 1].map((c) => <rect key={`${r}${c}`} x={42 + c * 10} y={22 + r * 13} width="6" height="7" rx="1.5" fill={YELLOW} />)
    )}
    {[0, 1, 2].map((r) => (
      <rect key={r} x="16" y={48 + r * 14} width="8" height="7" rx="1.5" fill={WHITE} />
    ))}
    {[0, 1].map((r) => (
      <rect key={r} x="76" y={58 + r * 14} width="8" height="7" rx="1.5" fill={WHITE} />
    ))}
  </svg>
);

export const BoatIcon: React.FC<S> = ({ size }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 6) * 3;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`translate(0 ${bob}) rotate(${bob} 50 60)`}>
        <path d="M48 10 L48 62 L18 62 Z" fill={YELLOW} />
        <path d="M54 22 L54 62 L80 62 Z" fill={CORAL} />
        <rect x="48" y="10" width="5" height="56" fill={DARK} />
        <path d="M10 66 L90 66 L78 82 L22 82 Z" fill={PURPLE} />
      </g>
      <path d="M2 90 Q14 82 26 90 T50 90 T74 90 T98 90" stroke={BLUE} strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
};

export const BusIcon: React.FC<S & { color?: string }> = ({ size, color = YELLOW }) => (
  <svg width={size * 1.3} height={size} viewBox="0 0 130 100">
    <rect x="6" y="12" width="118" height="68" rx="16" fill={color} stroke={DARK} strokeWidth="5" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={16 + i * 24} y="22" width="18" height="22" rx="4" fill={WHITE} stroke={DARK} strokeWidth="3" />
    ))}
    <rect x="104" y="22" width="12" height="36" rx="3" fill={WHITE} stroke={DARK} strokeWidth="3" />
    <rect x="6" y="52" width="96" height="8" fill={CORAL} />
    <circle cx="32" cy="82" r="12" fill={DARK} />
    <circle cx="32" cy="82" r="5" fill={WHITE} />
    <circle cx="100" cy="82" r="12" fill={DARK} />
    <circle cx="100" cy="82" r="5" fill={WHITE} />
  </svg>
);

export const BedIcon: React.FC<S> = ({ size }) => (
  <svg width={size * 1.2} height={size} viewBox="0 0 120 100">
    <rect x="6" y="20" width="12" height="74" rx="5" fill={DARK} />
    <rect x="102" y="50" width="12" height="44" rx="5" fill={DARK} />
    <rect x="12" y="56" width="98" height="24" rx="6" fill={TEAL} />
    <rect x="22" y="40" width="32" height="18" rx="8" fill={WHITE} stroke={DARK} strokeWidth="3" />
    <path d="M56 40 L104 40 Q110 40 110 50 L110 58 L56 58 Z" fill={PINK} />
  </svg>
);

export const ObeliscoIcon: React.FC<S> = ({ size }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 50 100">
    <path d="M25 2 L34 16 L32 92 L18 92 L16 16 Z" fill={WHITE} stroke={DARK} strokeWidth="4" strokeLinejoin="round" />
    <rect x="22" y="40" width="6" height="8" rx="1" fill={DARK} />
    <rect x="8" y="90" width="34" height="8" rx="3" fill={DARK} />
  </svg>
);

export const CoffeeIcon: React.FC<S> = ({ size }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 10) % 30) / 30;
        return (
          <path
            key={i}
            d={`M${32 + i * 14} 30 q-6 -8 0 -16`}
            stroke={PURPLE}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity={1 - t}
            transform={`translate(0 ${-t * 10})`}
          />
        );
      })}
      <path d="M18 40 L76 40 L70 86 Q69 92 62 92 L32 92 Q25 92 24 86 Z" fill={ORANGE} stroke={DARK} strokeWidth="4" />
      <path d="M74 50 Q94 50 90 64 Q86 76 70 74" stroke={DARK} strokeWidth="7" fill="none" />
      <rect x="18" y="38" width="58" height="10" rx="4" fill={WHITE} stroke={DARK} strokeWidth="4" />
    </svg>
  );
};

export const SunIcon: React.FC<S> = ({ size }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`rotate(${frame * 1.2} 50 50)`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="47" y="2" width="6" height="16" rx="3" fill={ORANGE} transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="28" fill={YELLOW} stroke={ORANGE} strokeWidth="4" />
      <circle cx="41" cy="46" r="3.5" fill={DARK} />
      <circle cx="59" cy="46" r="3.5" fill={DARK} />
      <path d="M38 57 Q50 68 62 57" stroke={DARK} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
};

export const ChatIcon: React.FC<S> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M14 14 L86 14 Q94 14 94 22 L94 66 Q94 74 86 74 L42 74 L22 92 L24 74 L14 74 Q6 74 6 66 L6 22 Q6 14 14 14 Z" fill={WHITE} />
    <circle cx="32" cy="44" r="7" fill={PINK} />
    <circle cx="50" cy="44" r="7" fill={YELLOW} />
    <circle cx="68" cy="44" r="7" fill={TEAL} />
  </svg>
);

export const StarIcon: React.FC<S & { color?: string }> = ({ size, color = YELLOW }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 4 L62 36 L96 38 L70 60 L79 94 L50 75 L21 94 L30 60 L4 38 L38 36 Z" fill={color} stroke={DARK} strokeWidth="4" strokeLinejoin="round" />
  </svg>
);
