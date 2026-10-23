"""Genera efectos de sonido suaves (sintetizados) para el video."""
import sys, wave
import numpy as np

SR = 48000
OUT = sys.argv[1]
rng = np.random.default_rng(7)


def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    with wave.open(f"{OUT}/{name}.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def t_(d):
    return np.arange(int(SR * d)) / SR


def lowpass_sweep(x, cutoffs):
    y = np.zeros_like(x); prev = 0.0
    a = 1 - np.exp(-2 * np.pi * cutoffs / SR)
    for i in range(len(x)):
        prev += a[i] * (x[i] - prev); y[i] = prev
    return y


def fade(x, ms=5):
    n = int(SR * ms / 1000); x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n); return x


# Whoosh: ruido filtrado con barrido de frecuencia
t = t_(0.8)
noise = rng.standard_normal(len(t))
p = t / t[-1]
cut = 300 + 3500 * np.sin(np.pi * p) ** 2
w = lowpass_sweep(noise, cut) - lowpass_sweep(noise, cut * 0.25)
env = np.sin(np.pi * p ** 0.8) ** 2
save("whoosh", fade(w * env))

# Pop suave
t = t_(0.14)
f = 850 * np.exp(-t * 18) + 380
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 32)
save("pop", fade(pop, 2))


def bell(freq, d, decay=3.5):
    t = t_(d)
    s = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-t * decay * r ** 0.5)
            for r, a in [(1, 1), (2.01, 0.35), (3.02, 0.15), (4.2, 0.06)])
    return s * (1 - np.exp(-t * 400))


# Chime: dos notas (E6 → B6)
c = np.zeros(int(SR * 1.6))
b1 = bell(1318.5, 1.2); b2 = bell(1975.5, 1.2)
c[:len(b1)] += b1; o = int(SR * 0.12); c[o:o + len(b2)] += 0.8 * b2
save("chime", fade(c))

# Rise: barrido ascendente con brillo (crecimiento)
t = t_(0.9)
f = 380 * (2.4 ** (t / t[-1]))
r = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.3 * np.sin(2 * np.pi * np.cumsum(f * 2) / SR)
r *= np.sin(np.pi * t / t[-1]) ** 1.5
save("rise", fade(r))

# Shimmer: arpegio de campanas para el cierre
notes = [1046.5, 1318.5, 1568.0, 2093.0]
sh = np.zeros(int(SR * 2.2))
for i, n in enumerate(notes):
    b = bell(n, 1.6, 2.6); o = int(SR * 0.09 * i); sh[o:o + len(b)] += b * (0.9 - 0.12 * i)
save("shimmer", fade(sh))

# Tick: clic muy corto para chips y números
t = t_(0.05)
tick = np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 120)
save("tick", fade(tick, 1))
