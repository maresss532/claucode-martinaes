import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { f } from "./theme";
import {
  Card,
  CheckBadge,
  CREAM,
  DARK,
  Full,
  HouseIcon,
  PercentIcon,
  PinIcon,
  Pop,
  SearchIcon,
  StepBadge,
  TagIcon,
  TargetIcon,
  WHITE,
  YELLOW,
  body,
  clamp,
  head,
  usePop,
} from "./kit";

type P = { dur: number; r: (s: number) => number };

const Row: React.FC<{ children: React.ReactNode; gap?: number; style?: React.CSSProperties }> = ({ children, gap = 24, style }) => (
  <div style={{ display: "flex", alignItems: "center", gap, ...style }}>{children}</div>
);
const Col: React.FC<{ children: React.ReactNode; gap?: number; style?: React.CSSProperties }> = ({ children, gap = 16, style }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap, ...style }}>{children}</div>
);

// Resaltado amarillo que barre detrás de una palabra
const Highlight: React.FC<{ delay: number; children: React.ReactNode; size: number }> = ({ delay, children, size }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 14px" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: size * 0.06,
          height: size * 0.62,
          background: YELLOW,
          borderRadius: 10,
          transformOrigin: "left",
          transform: `scaleX(${p})`,
        }}
      />
      <span style={{ position: "relative", ...head(size) }}>{children}</span>
    </span>
  );
};

// Título de paso para tarjetas: [02] precio
const StepHeader: React.FC<{ n: string; title: string }> = ({ n, title }) => (
  <Row gap={22} style={{ justifyContent: "center" }}>
    <StepBadge n={n} size={92} delay={3} />
    <Pop delay={7} from="up">
      <div style={head(72)}>{title}</div>
    </Pop>
  </Row>
);

// ---------- 01 Intro ----------
export const Intro: React.FC<P> = ({ dur, r }) => {
  const q = usePop(r(4.06));
  const ok = usePop(r(5.8));
  return (
    <Card dur={dur} width={560}>
      <Col gap={18}>
        <div style={{ position: "relative" }}>
          <Pop delay={4}>
            <HouseIcon size={230} />
          </Pop>
          {/* ¿? que se convierte en ✓ */}
          <div
            style={{
              position: "absolute",
              right: -34,
              top: -10,
              width: 100,
              height: 100,
              transform: `scale(${q})`,
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 1 - ok }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  background: DARK,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...head(62, YELLOW),
                }}
              >
                ?
              </div>
            </div>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${ok})` }}>
              <CheckBadge size={100} progress={ok} />
            </div>
          </div>
        </div>
        <Pop delay={r(1.34)} from="up">
          <div style={body(46)}>Invertir en</div>
        </Pop>
        <Pop delay={r(1.94)} from="up">
          <Highlight delay={r(2.1)} size={74}>
            Propiedades
          </Highlight>
        </Pop>
      </Col>
    </Card>
  );
};

// ---------- 02 Hook (pantalla completa) ----------
export const Hook: React.FC<P> = ({ dur }) => {
  const frame = useCurrentFrame();
  const swing = interpolate(frame, [18, 60], [0, 1], clamp);
  return (
    <Full dur={dur} bg={YELLOW}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Col gap={10}>
          <div style={{ position: "relative" }}>
            <StepBadge n="4" size={330} delay={3} inverted />
            <div
              style={{
                position: "absolute",
                right: -90,
                bottom: -60,
                transform: `rotate(${Math.sin(swing * Math.PI * 2) * 12}deg)`,
              }}
            >
              <Pop delay={14}>
                <SearchIcon size={200} b={YELLOW} />
              </Pop>
            </div>
          </div>
          <Pop delay={10} from="up" style={{ marginTop: 50 }}>
            <div style={body(64)}>Claves para</div>
          </Pop>
          <Pop delay={15} from="up">
            <div style={head(130)}>Detectarla</div>
          </Pop>
        </Col>
      </AbsoluteFill>
    </Full>
  );
};

// Ondas tipo radar
const Ripples: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const t = ((frame - start - i * 14) % 42) / 42;
        if (frame - start - i * 14 < 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 520,
              height: 200,
              marginLeft: -260,
              marginTop: -100,
              borderRadius: "50%",
              border: `5px solid ${YELLOW}`,
              transform: `scale(${0.2 + t})`,
              opacity: 1 - t,
            }}
          />
        );
      })}
    </>
  );
};

// ---------- 03 Paso 1: Ubicación ----------
export const Ubicacion: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const fullEnd = r(12.45);
  const drop = usePop(6);
  const items = [
    { t: 12.66, label: "Proyección" },
    { t: 14.02, label: "Infraestructura" },
    { t: 15.36, label: "Demanda en crecimiento" },
  ];
  return (
    <AbsoluteFill>
      {frame < fullEnd ? (
        <Full dur={dur} bg={CREAM} grid exitAt={fullEnd}>
          <AbsoluteFill style={{ alignItems: "center", top: 300 }}>
            <Row gap={26}>
              <StepBadge n="01" size={130} delay={2} />
              <Pop delay={6} from="up">
                <div style={head(110)}>Ubicación</div>
              </Pop>
            </Row>
          </AbsoluteFill>
          <AbsoluteFill style={{ top: 1180, height: 0 }}>
            <Ripples start={20} />
          </AbsoluteFill>
          <AbsoluteFill style={{ alignItems: "center", top: 1180 - 330 }}>
            <div style={{ transform: `translateY(${(1 - drop) * -700}px)` }}>
              <PinIcon size={260} />
            </div>
          </AbsoluteFill>
        </Full>
      ) : null}
      {frame >= fullEnd - 2 ? (
        <SeqOffset offset={fullEnd - 2}>
          <Card dur={dur - fullEnd + 2} width={820}>
            <Col gap={26} style={{ alignItems: "stretch" }}>
              <Row gap={20} style={{ justifyContent: "center" }}>
                <PinIcon size={70} />
                <div style={head(64)}>Ubicación</div>
              </Row>
              {items.map((it) => (
                <ItemRow key={it.label} delay={r(it.t) - fullEnd + 2} label={it.label} />
              ))}
            </Col>
          </Card>
        </SeqOffset>
      ) : null}
    </AbsoluteFill>
  );
};

// Desplaza el tiempo de sus hijos (para sub-escenas dentro de un clip)
const SeqOffset: React.FC<{ offset: number; children: React.ReactNode }> = ({ offset, children }) => (
  <Sequence from={offset} layout="none">
    {children}
  </Sequence>
);

const ItemRow: React.FC<{ delay: number; label: string }> = ({ delay, label }) => {
  const p = usePop(delay);
  const chk = usePop(delay + 4, false);
  return (
    <Row
      gap={22}
      style={{
        opacity: Math.min(1, p * 2),
        transform: `translateX(${(1 - p) * -80}px)`,
        background: CREAM,
        borderRadius: 999,
        padding: "14px 30px 14px 14px",
      }}
    >
      <CheckBadge size={64} progress={chk} />
      <div style={head(44)}>{label}</div>
    </Row>
  );
};

// ---------- 04 Paso 2: Precio ----------
export const Precio: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame / 7) * 14 * Math.exp(-frame / 40);
  const stamp = interpolate(frame, [r(20.88), r(20.88) + 6], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  return (
    <Card dur={dur} width={640}>
      <Col gap={30}>
        <StepHeader n="02" title="Precio" />
        <div style={{ position: "relative", height: 300, width: 400, display: "flex", justifyContent: "center" }}>
          <Pop delay={10}>
            <div style={{ transform: `rotate(${swing}deg)`, transformOrigin: "20% 20%" }}>
              <TagIcon size={290} />
            </div>
          </Pop>
          <div
            style={{
              position: "absolute",
              right: -40,
              bottom: 0,
              opacity: stamp,
              transform: `scale(${2 - stamp}) rotate(-10deg)`,
            }}
          >
            <Row gap={12} style={{ background: YELLOW, borderRadius: 18, padding: "12px 26px", border: `5px solid ${DARK}` }}>
              <div style={head(56)}>Justo</div>
              <CheckBadge size={52} a={DARK} b={YELLOW} />
            </Row>
          </div>
        </div>
      </Col>
    </Card>
  );
};

// ---------- 05 Paso 3: Rentabilidad ----------
export const Rentabilidad: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const bars = [0.35, 0.55, 0.75, 1];
  const arrow = interpolate(frame, [r(23.2), r(23.2) + 18], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Card dur={dur} width={760}>
      <Col gap={30}>
        <StepHeader n="03" title="Rentabilidad" />
        <div style={{ position: "relative", width: 480, height: 260 }}>
          <Row gap={26} style={{ alignItems: "flex-end", height: 260, justifyContent: "center" }}>
            {bars.map((h, i) => {
              const g = interpolate(frame, [r(22.8) + i * 4, r(22.8) + i * 4 + 14], [0, 1], {
                ...clamp,
                easing: Easing.out(Easing.back(1.8)),
              });
              return (
                <div
                  key={i}
                  style={{
                    width: 78,
                    height: 230 * h * g,
                    background: i === bars.length - 1 ? YELLOW : DARK,
                    borderRadius: "14px 14px 4px 4px",
                  }}
                />
              );
            })}
          </Row>
          <svg width={480} height={260} viewBox="0 0 480 260" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <path
              d="M40 210 L170 140 L280 170 L440 30"
              fill="none"
              stroke={YELLOW}
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - arrow}
              style={{ filter: `drop-shadow(0 0 0 ${DARK}) drop-shadow(0 4px 0 ${DARK})` }}
            />
            <path
              d="M400 30 L440 30 L440 70"
              fill="none"
              stroke={YELLOW}
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={arrow > 0.95 ? 1 : 0}
              style={{ filter: `drop-shadow(0 4px 0 ${DARK})` }}
            />
          </svg>
        </div>
        <Row gap={18}>
          <Pop delay={r(25.12)}>
            <div style={{ ...head(44), background: YELLOW, borderRadius: 999, padding: "14px 30px" }}>+ Ingresos</div>
          </Pop>
          <Pop delay={r(28.78)}>
            <div style={{ ...head(44, WHITE), background: DARK, borderRadius: 999, padding: "14px 30px" }}>− Gastos</div>
          </Pop>
        </Row>
      </Col>
    </Card>
  );
};

// ---------- 06 Paso 4: Cap Rate (pantalla completa) ----------
export const CapRate: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const spin = interpolate(frame, [8, 30], [-180, 0], { ...clamp, easing: Easing.out(Easing.back(1.5)) });
  return (
    <Full dur={dur} bg={YELLOW}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Col gap={20}>
          <StepBadge n="04" size={150} delay={2} inverted />
          <Pop delay={6} from="up" style={{ marginTop: 20 }}>
            <div style={head(160)}>Cap Rate</div>
          </Pop>
          <Pop delay={10}>
            <div style={{ transform: `rotate(${spin}deg)`, margin: "30px 0" }}>
              <PercentIcon size={260} />
            </div>
          </Pop>
          <Pop delay={r(31.98)} from="up">
            <div style={body(60)}>Tasa de capitalización</div>
          </Pop>
        </Col>
      </AbsoluteFill>
    </Full>
  );
};

// ---------- 07 Fórmula ----------
export const Formula: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [r(36.6), r(37.3)], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Card dur={dur} width={940} pad="46px 40px">
      <Row gap={28} style={{ justifyContent: "center" }}>
        <Col gap={10}>
          <Pop delay={3}>
            <PercentIcon size={110} />
          </Pop>
          <Pop delay={6}>
            <div style={head(46)}>Cap Rate</div>
          </Pop>
        </Col>
        <Pop delay={8}>
          <div style={head(90)}>=</div>
        </Pop>
        <Col gap={14}>
          <Pop delay={r(35.36)} from="up">
            <Highlight delay={r(35.6)} size={50}>
              Renta anual neta
            </Highlight>
          </Pop>
          <div style={{ width: 470 * line, height: 8, borderRadius: 8, background: DARK }} />
          <Pop delay={r(37.58)} from="up">
            <Highlight delay={r(37.8)} size={50}>
              Precio de compra
            </Highlight>
          </Pop>
        </Col>
      </Row>
    </Card>
  );
};

// ---------- 08 Comparar ----------
export const Comparar: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const best = usePop(r(42.5));
  const hs = [0.5, 1, 0.68];
  return (
    <Card dur={dur} width={860}>
      <Col gap={24}>
        <Pop delay={4} from="up">
          <div style={body(46)}>Comparamos</div>
        </Pop>
        <Pop delay={8} from="up">
          <div style={head(72)}>Propiedades</div>
        </Pop>
        <Row gap={50} style={{ alignItems: "flex-end", marginTop: 20 }}>
          {hs.map((h, i) => {
            const isBest = i === 1;
            const g = interpolate(frame, [r(40.2) + i * 5, r(40.2) + i * 5 + 16], [0, 1], {
              ...clamp,
              easing: Easing.out(Easing.back(1.6)),
            });
            const hl = isBest ? best : 0;
            return (
              <Col key={i} gap={14}>
                <div style={{ position: "relative" }}>
                  <Pop delay={12 + i * 5}>
                    <div style={{ transform: `scale(${1 + hl * 0.15})` }}>
                      <HouseIcon size={150} a={hl > 0.5 ? YELLOW : DARK} b={hl > 0.5 ? DARK : YELLOW} />
                    </div>
                  </Pop>
                  {isBest ? (
                    <div style={{ position: "absolute", right: -26, top: -26, transform: `scale(${best})` }}>
                      <CheckBadge size={72} a={DARK} b={YELLOW} progress={best} />
                    </div>
                  ) : null}
                </div>
                <div
                  style={{
                    width: 110,
                    height: 230 * h * g,
                    background: isBest ? YELLOW : "#D9D3C4",
                    borderRadius: 16,
                    border: isBest ? `5px solid ${DARK}` : "none",
                  }}
                />
              </Col>
            );
          })}
        </Row>
        <Pop delay={r(42.6)}>
          <div style={{ ...head(44, YELLOW), background: DARK, borderRadius: 999, padding: "14px 34px" }}>
            Mejor rentabilidad
          </div>
        </Pop>
        <Pop delay={r(44.06)} from="up">
          <div style={body(40)}>En relación al precio</div>
        </Pop>
      </Col>
    </Card>
  );
};

// ---------- 09 Estrategia ----------
export const Estrategia: React.FC<P> = ({ dur }) => {
  const frame = useCurrentFrame();
  const arrow = interpolate(frame, [16, 24], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const shake = frame > 24 && frame < 34 ? Math.sin((frame - 24) * 2.2) * 6 * (1 - (frame - 24) / 10) : 0;
  return (
    <Card dur={dur} width={700}>
      <Row gap={30} style={{ justifyContent: "center" }}>
        <Pop delay={2}>
          <div style={{ transform: `rotate(${shake}deg)` }}>
            <TargetIcon size={190} arrow={arrow} />
          </div>
        </Pop>
        <Col gap={8} style={{ alignItems: "flex-start" }}>
          <Pop delay={5} from="up">
            <div style={body(42)}>La clave es la</div>
          </Pop>
          <Pop delay={9} from="up">
            <Highlight delay={14} size={70}>
              Estrategia
            </Highlight>
          </Pop>
        </Col>
      </Row>
    </Card>
  );
};

// ---------- 10 Cierre ----------
export const Cierre: React.FC<P> = ({ dur, r }) => {
  const frame = useCurrentFrame();
  const shrinkAt = r(50.3);
  const s = interpolate(frame, [shrinkAt, shrinkAt + 16], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const open = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const out = interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  const name = "Lopez Baena";
  // De pantalla completa a banner superior
  const box = {
    left: interpolate(s, [0, 1], [0, 110]),
    top: interpolate(s, [0, 1], [0, 150]),
    width: interpolate(s, [0, 1], [1080, 860]),
    height: interpolate(s, [0, 1], [1920, 300]),
    radius: interpolate(s, [0, 1], [0, 60]),
  };
  const scale = interpolate(s, [0, 1], [1, 0.5]);
  return (
    <AbsoluteFill style={{ opacity: out, clipPath: `circle(${open * 120}% at 50% 50%)` }}>
      <div
        style={{
          position: "absolute",
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
          borderRadius: box.radius,
          background: YELLOW,
          overflow: "hidden",
          boxShadow: s > 0 ? `0 24px 60px rgba(0,0,0,${0.3 * s})` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col gap={30} style={{ transform: `scale(${scale})`, flexShrink: 0 }}>
          <div style={{ display: "flex" }}>
            {name.split("").map((ch, i) => (
              <Pop key={i} delay={6 + i * 2} from="up">
                <span style={{ ...head(150), whiteSpace: "pre" }}>{ch}</span>
              </Pop>
            ))}
          </div>
          <Pop delay={30} from="up">
            <div style={{ ...body(64), opacity: 1 - s }}>Las personas primero</div>
          </Pop>
        </Col>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Línea de tiempo (segundos del video original) ----------
type Item = { name: string; from: number; to: number; C: React.FC<P> };
export const TIMELINE: Item[] = [
  { name: "Intro-Propiedades", from: 0.15, to: 6.4, C: Intro },
  { name: "Hook-4-claves", from: 6.75, to: 9.15, C: Hook },
  { name: "Paso1-Ubicacion", from: 9.26, to: 16.35, C: Ubicacion },
  { name: "Paso2-Precio", from: 16.58, to: 21.7, C: Precio },
  { name: "Paso3-Rentabilidad", from: 21.94, to: 29.8, C: Rentabilidad },
  { name: "Paso4-CapRate", from: 30.12, to: 33.55, C: CapRate },
  { name: "Formula-CapRate", from: 33.7, to: 38.35, C: Formula },
  { name: "Comparar-Propiedades", from: 38.6, to: 45.1, C: Comparar },
  { name: "Clave-Estrategia", from: 45.25, to: 47.3, C: Estrategia },
  { name: "Cierre-LopezBaena", from: 47.45, to: 53.4, C: Cierre },
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

// Vista previa: todas las animaciones sobre el video original
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
