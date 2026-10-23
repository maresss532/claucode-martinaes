// Registrar en src/Root.tsx: una vista previa + una composición por animación
import { Composition, Folder } from "remotion";
import { Clip, Preview, TIMELINE } from "./Scenes";
import { f } from "./theme";

export const RemotionRoot: React.FC = () => (
  <Folder name="Animaciones">
    {/* durationInFrames = duración del video original × 30 */}
    <Composition id="Preview" component={Preview} durationInFrames={1602} fps={30} width={1080} height={1920} />
    {TIMELINE.map((it, i) => (
      <Composition
        key={it.name}
        id={`${String(i + 1).padStart(2, "0")}-${it.name}`}
        component={Clip}
        durationInFrames={f(it.to) - f(it.from)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ index: i }}
      />
    ))}
  </Folder>
);
