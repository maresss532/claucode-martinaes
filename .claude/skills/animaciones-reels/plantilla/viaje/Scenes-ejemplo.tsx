import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { f } from "../theme";
import {
  BLUE,
  CORAL,
  Card,
  CREAM,
  DARK,
  Full,
  GREEN,
  ORANGE,
  PINK,
  PURPLE,
  Pop,
  RAINBOW,
  TEAL,
  WHITE,
  YELLOW,
  body,
  clamp,
  head,
  usePop,
} from "./kit";
import {
  BedIcon,
  BoatIcon,
  BusIcon,
  CalendarIcon,
  ChatIcon,
  CityIcon,
  CoffeeIcon,
  FamilyIcon,
  FerrisIcon,
  GiftIcon,
  HeartIcon,
  ObeliscoIcon,
  PenguinIcon,
  StarIcon,
  SunIcon,
} from "./icons";

type P = { dur: number; r: (s: number) => number };

const Row: React.FC<{ children: React.ReactNode; gap?: number; style?: React.CSSProperties }> = ({ children, gap = 24, style }) => (
  <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>
);
const Col: React.FC<{ children: React.ReactNode; gap?: number; style?: React.CSSProperties }> = ({ children, gap = 16, style }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap, ...style }}>{children}</div>
);

// Resaltado de color que barre detrás de una palabra
const Highlight: React.FC<{ delay: number; children: React.ReactNode; size: number; color?: string; text?: string }> = ({
  delay,
  children,
  size,
  color = YELLOW,
  text = DARK,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 18px" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: size * 0.02,
          height: size * 0.8,
          background: color,
          borderRadius: 18,
          transformOrigin: "left",
          transform: `scaleX(${p}) rotate(-1.5deg)`,
        }}
      />
      <span style={{ position: "relative", ...head(size, text) }}>{children}</span>
    </span>
  );
};

// Explosión de confeti
const Confetti: React.FC<{ at: number; x?: number; y?: number; count?: number; spread?: number }> = ({
  at,
  x = 540,
  y = 500,
  count = 36,
  spread = 520,
}) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0 || t > 45) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const a = random(`a${i}${at}`) * Math.PI * 2;
        const v = 0.5 + random(`v${i}${at}`) * 0.5;
        const p = Easing.out(Easing.cubic)(Math.min(1, t / 30));
        const px = x + Math.cos(a) * spread * v * p;
        const py = y + Math.sin(a) * spread * 0.7 * v * p + t * t * 0.18;
        const w = 14 + random(`w${i}${at}`) * 14;
        const round = random(`s${i}${at}`) > 0.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: w,
              height: round ? w : w * 0.5,
              borderRadius: round ? w : 4,
              background: RAINBOW[i % RAINBOW.length],
              transform: `rotate(${t * 14 * (i % 2 ? 1 : -1)}deg)`,
              opacity: interpolate(t, [32, 45], [1, 0], clamp),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Ícono dentro de un círculo de color
const Bubble: React.FC<{ color: string; size?: number; children: React.ReactNode }> = ({ color, size = 96, children }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      border: `4px solid ${DARK}`,
    }}
  >
    {children}
  </div>
);

// Ítem de lista que entra deslizando con rebote
const Item: React.FC<{ delay: number; color: string; icon: React.ReactNode; title: string; sub?: React.ReactNode }> = ({
  delay,
  color,
  icon,
  title,
  sub,
}) => {
  const p = usePop(delay);
  return (
    <Row
      gap={24}
      style={{
        opacity: Math.min(1, p * 2),
        transform: `translateX(${(1 - p) * -120}px)`,
        background: `${color}22`,
        borderRadius: 999,
        padding: "8px 30px 8px 8px",
      }}
    >
      <Bubble color={color}>{icon}</Bubble>
      <Col gap={4} style={{ alignItems: "flex-start" }}>
        <div style={head(42)}>{title}</div>
        {sub}
      </Col>
    </Row>
  );
};

const Sticker: React.FC<{ delay: number; color: string; children: React.ReactNode; rotate?: number; textColor?: string }> = ({
  delay,
  color,
  children,
  rotate = -6,
  textColor = WHITE,
}) => {
  const p = usePop(delay);
  return (
    <div
      style={{
        ...head(44, textColor),
        background: color,
        borderRadius: 999,
        padding: "12px 30px",
        border: `4px solid ${DARK}`,
        transform: `scale(${p}) rotate(${rotate * p}deg)`,
        opacity: Math.min(1, p * 2),
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

// ---------- 01 Intro: ¿Finde largo de noviembre? ----------
export const Intro: React.FC<P> = ({ dur, r }) => (
  <AbsoluteFill>
    <Card dur={dur} width={700} accent={CORAL} top={110}>
      <Col gap={14}>
        <Pop delay={3}>
          <CalendarIcon size={160} />
        </Pop>
        <Pop delay={r(1.16)} from="up">
          <div style={body(48)}>¿Finde largo de</div>
        </Pop>
        <Pop delay={r(2.0)} from="up">
          <Highlight delay={r(2.24)} size={86} color={YELLOW}>
            Noviembre?
          </Highlight>
        </Pop>
        <div style={{ marginTop: 10 }}>
          <Sticker delay={r(2.9)} color={TEAL}>
            ¡Tenemos la solución!
          </Sticker>
        </div>
      </Col>
    </Card>
    <Confetti at={r(3.16)} y={620} />
  </AbsoluteFill>
);

// ---------- 02 Experiencia para toda la vida ----------
export const Experiencia: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const hearts = [
    { x: -40, d: r(6.08), c: CORAL },
    { x: 400, d: r(6.3), c: PINK },
    { x: 180, d: r(6.6), c: PURPLE },
  ];
  return (
    <Card dur={dur} width={860} accent={PINK} top={110}>
      <Col gap={16}>
        <div style={{ position: "relative" }}>
          <Pop delay={3}>
            <FamilyIcon size={160} />
          </Pop>
          {hearts.map((h, i) => {
            const t = frame - h.d;
            if (t < 0) return null;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: h.x,
                  top: -t * 3,
                  opacity: interpolate(t, [0, 6, 30, 40], [0, 1, 1, 0], clamp),
                  transform: `scale(${Math.min(1, t / 6)}) rotate(${Math.sin(t / 4) * 12}deg)`,
                }}
              >
                <HeartIcon size={70} color={h.c} />
              </div>
            );
          })}
        </div>
        <Pop delay={r(4.3)} from="up">
          <div style={body(46)}>Una experiencia para tus hijos</div>
        </Pop>
        <Pop delay={r(6.0)} from="up">
          <Highlight delay={r(6.4)} size={78} color={PINK} text={WHITE}>
            Para toda la vida
          </Highlight>
        </Pop>
      </Col>
    </Card>
  );
};

// ---------- 03 Paquete (pantalla completa) ----------
export const Paquete: React.FC<P> = ({ dur }) => {
  const frame = useCurrentFrame();
  const wobble = Math.sin(frame / 3) * 6 * Math.exp(-frame / 25);
  return (
    <Full dur={dur} bg={TEAL}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Col gap={20}>
          <Pop delay={3}>
            <div style={{ transform: `rotate(${wobble}deg)` }}>
              <GiftIcon size={320} />
            </div>
          </Pop>
          <Pop delay={7} from="up">
            <div style={{ ...head(70, DARK) }}>Tenemos un</div>
          </Pop>
          <Pop delay={10} from="up">
            <div style={{ ...head(170, YELLOW), WebkitTextStroke: `6px ${DARK}`, paintOrder: "stroke fill" }}>Paquete</div>
          </Pop>
          <Pop delay={14} from="up">
            <div style={{ ...head(70, DARK) }}>Que incluye...</div>
          </Pop>
        </Col>
      </AbsoluteFill>
      <Confetti at={6} y={900} count={44} spread={700} />
    </Full>
  );
};

// ---------- 04 Lo que incluye ----------
export const Incluye: React.FC<P> = ({ dur, r }) => (
  <Card dur={dur} width={880} accent={TEAL} pad="30px 34px" top={100}>
    <Col gap={14} style={{ alignItems: "stretch" }}>
      <Item
        delay={r(9.16)}
        color={CORAL}
        icon={<FerrisIcon size={78} />}
        title="Parque de la Costa"
        sub={
          <div style={{ marginTop: 4 }}>
            <Sticker delay={r(11.54)} color={YELLOW} textColor={DARK} rotate={-3}>
              Entradas incluidas
            </Sticker>
          </div>
        }
      />
      <Item
        delay={r(10.7)}
        color={BLUE}
        icon={<PenguinIcon size={74} />}
        title="Temaikèn"
        sub={
          <div style={{ marginTop: 4 }}>
            <Sticker delay={r(11.54)} color={YELLOW} textColor={DARK} rotate={-3}>
              Entradas incluidas
            </Sticker>
          </div>
        }
      />
      <Item delay={r(13.0)} color={PURPLE} icon={<CityIcon size={70} />} title="City tour por Buenos Aires" />
      <Item delay={r(14.96)} color={GREEN} icon={<BoatIcon size={74} />} title="Paseo por el Tigre" />
    </Col>
  </Card>
);

// ---------- 05 Ruta Córdoba → Buenos Aires (pantalla completa) ----------
export const Ruta: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [8, dur - 12], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  // Curva de Córdoba (abajo izq.) a Buenos Aires (arriba der.)
  const P0 = { x: 220, y: 1350 };
  const P1 = { x: 420, y: 700 };
  const P2 = { x: 860, y: 900 };
  const bez = (t: number) => ({
    x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t * t * P2.x,
    y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t * t * P2.y,
  });
  const bus = bez(p);
  const ahead = bez(Math.min(1, p + 0.01));
  const ang = (Math.atan2(ahead.y - bus.y, ahead.x - bus.x) * 180) / Math.PI;
  const pinA = usePop(4);
  const pinB = usePop(Math.round((dur - 12) * 0.9));
  const Pin: React.FC<{ color: string; s: number }> = ({ color, s }) => (
    <svg width={90} height={120} viewBox="0 0 100 130" style={{ transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      <path d="M50 4C26 4 8 22 8 46c0 32 42 78 42 78s42-46 42-78C92 22 74 4 50 4z" fill={color} stroke={DARK} strokeWidth="5" />
      <circle cx="50" cy="46" r="16" fill={WHITE} />
    </svg>
  );
  return (
    <Full dur={dur} bg={CREAM} grid>
      <AbsoluteFill style={{ alignItems: "center", top: 260 }}>
        <Pop delay={2} from="up">
          <div style={body(60)}>Todo saliendo de</div>
        </Pop>
        <Pop delay={r(17.6)} from="up">
          <Highlight delay={r(17.8)} size={120} color={ORANGE} text={WHITE}>
            Córdoba
          </Highlight>
        </Pop>
      </AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <path
          d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
          fill="none"
          stroke={PURPLE}
          strokeWidth={12}
          strokeDasharray="4 30"
          strokeLinecap="round"
          pathLength={1000}
          style={{ strokeDashoffset: 0 }}
          opacity={0.25}
        />
        <path
          d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
          fill="none"
          stroke={PURPLE}
          strokeWidth={14}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${p} 1`}
        />
      </svg>
      <div style={{ position: "absolute", left: P0.x - 45, top: P0.y - 120 }}>
        <Pin color={CORAL} s={pinA} />
      </div>
      <div style={{ position: "absolute", left: P0.x - 110, top: P0.y + 20, ...head(46), opacity: pinA }}>Córdoba</div>
      <div style={{ position: "absolute", left: P2.x - 45, top: P2.y - 120 }}>
        <Pin color={BLUE} s={pinB} />
      </div>
      <div style={{ position: "absolute", left: P2.x - 240, top: P2.y - 200, ...head(52), opacity: pinB }}>Buenos Aires</div>
      <div
        style={{
          position: "absolute",
          left: bus.x - 78,
          top: bus.y - 60,
          transform: `rotate(${ang}deg) scale(${pinA})`,
        }}
      >
        <BusIcon size={120} />
      </div>
    </Full>
  );
};

// ---------- 06 El viaje incluye ----------
export const Viaje: React.FC<P> = ({ dur, r }) => (
  <Card dur={dur} width={880} accent={PURPLE} pad="30px 34px" top={100}>
    <Col gap={14} style={{ alignItems: "stretch" }}>
      <Row gap={14} style={{ justifyContent: "center" }}>
        <Pop delay={3} from="up">
          <div style={body(50)}>El viaje</div>
        </Pop>
        <Pop delay={6} from="up">
          <Highlight delay={8} size={64} color={PURPLE} text={WHITE}>
            Incluye
          </Highlight>
        </Pop>
      </Row>
      <Item delay={r(19.58)} color={YELLOW} icon={<BusIcon size={56} color={WHITE} />} title="Bus semicama" />
      <Item
        delay={r(20.7)}
        color={TEAL}
        icon={<BedIcon size={64} />}
        title="Hospedaje"
        sub={
          <Row gap={10}>
            <ObeliscoIcon size={54} />
            <div style={body(36)}>A metros del Obelisco</div>
          </Row>
        }
      />
      <Item delay={r(22.9)} color={ORANGE} icon={<CoffeeIcon size={70} />} title="¡Con desayuno!" />
    </Col>
  </Card>
);

// ---------- 07 Un finde especial ----------
export const Especial: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const stars = [
    { x: -330, y: -40, c: YELLOW, d: r(25.98) },
    { x: 300, y: -70, c: PINK, d: r(26.1) },
    { x: 340, y: 120, c: TEAL, d: r(26.25) },
    { x: -300, y: 150, c: ORANGE, d: r(26.4) },
  ];
  return (
    <Card dur={dur} width={760} accent={ORANGE} top={110}>
      <Col gap={14} style={{ position: "relative" }}>
        <Pop delay={3}>
          <SunIcon size={190} />
        </Pop>
        <Pop delay={r(24.44)} from="up">
          <div style={body(48)}>Un fin de semana</div>
        </Pop>
        <Pop delay={r(25.9)} from="up">
          <Highlight delay={r(26.0)} size={92} color={CORAL} text={WHITE}>
            Especial
          </Highlight>
        </Pop>
        <Pop delay={r(26.6)} from="up">
          <div style={head(52, PURPLE)}>Con tus hijos</div>
        </Pop>
        {stars.map((s, i) => {
          const p = usePopSafe(frame, s.d);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(${s.x - 35}px, ${s.y - 35}px) scale(${p}) rotate(${frame * 3}deg)`,
              }}
            >
              <StarIcon size={70} color={s.c} />
            </div>
          );
        })}
      </Col>
    </Card>
  );
};

// Pop calculado sin hook (para listas)
const usePopSafe = (frame: number, delay: number) =>
  interpolate(frame, [delay, delay + 8, delay + 12], [0, 1.2, 1], { ...clamp, easing: Easing.out(Easing.quad) });

// ---------- 08 Llamado a la acción ----------
export const CTA: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const p = usePop(2);
  const out = interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  const bounce = Math.abs(Math.sin(frame / 5)) * 26;
  return (
    <AbsoluteFill style={{ alignItems: "center", top: 1060, opacity: out }}>
      <Col gap={18}>
        <div
          style={{
            transform: `scale(${p})`,
            background: PINK,
            borderRadius: 999,
            padding: "22px 50px 22px 26px",
            border: `6px solid ${WHITE}`,
            boxShadow: `0 12px 0 ${DARK}`,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <ChatIcon size={100} />
          <div style={head(84, WHITE)}>¡Escribinos!</div>
        </div>
        <Pop delay={r(29.38)} from="up">
          <div
            style={{
              ...head(46, DARK),
              background: YELLOW,
              borderRadius: 999,
              padding: "12px 34px",
              border: `4px solid ${DARK}`,
            }}
          >
            Te pasamos toda la info
          </div>
        </Pop>
        <div style={{ transform: `translateY(${bounce}px) scale(${p})` }}>
          <svg width={120} height={140} viewBox="0 0 120 140">
            <path d="M40 6 L80 6 L80 70 L112 70 L60 134 L8 70 L40 70 Z" fill={YELLOW} stroke={DARK} strokeWidth="7" strokeLinejoin="round" />
          </svg>
        </div>
      </Col>
      <Confetti at={4} y={1200 - 1060} count={30} spread={480} />
    </AbsoluteFill>
  );
};

// ---------- Línea de tiempo (segundos del video original) ----------
type Item_ = { name: string; from: number; to: number; C: React.FC<P> };
export const TIMELINE: Item_[] = [
  { name: "Intro-Finde-Largo", from: 0.15, to: 4.1, C: Intro },
  { name: "Experiencia-Toda-La-Vida", from: 4.24, to: 7.55, C: Experiencia },
  { name: "Paquete", from: 7.7, to: 9.1, C: Paquete },
  { name: "Incluye-Parques-Paseos", from: 9.16, to: 16.35, C: Incluye },
  { name: "Ruta-Cordoba-BsAs", from: 16.44, to: 18.6, C: Ruta },
  { name: "Viaje-Incluye", from: 18.7, to: 23.85, C: Viaje },
  { name: "Finde-Especial", from: 24.0, to: 27.5, C: Especial },
  { name: "CTA-Escribinos", from: 27.6, to: 31.0, C: CTA },
];

export const Clip: React.FC<{ index: number }> = ({ index }) => {
  const it = TIMELINE[index];
  const base = f(it.from);
  const C = it.C;
  return (
    <AbsoluteFill>
      <C dur={f(it.to) - base} r={(s) => f(s) - base} />
    </AbsoluteFill>
  );
};

// Vista previa: todas las animaciones sobre el video
export const Preview: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo src={staticFile("video.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {TIMELINE.map((it, i) => (
      <Sequence key={it.name} from={f(it.from)} durationInFrames={f(it.to) - f(it.from)}>
        <Clip index={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
