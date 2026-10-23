// Transcribe audio (f32le mono 16 kHz) con Whisper small local, con tiempos por palabra.
// Uso: node transcribe.mjs <carpeta-models> <audio.raw> <salida.json> word
import { pipeline, env } from '@huggingface/transformers';
import fs from 'fs';
const [,, modelRoot, rawPath, outPath, mode] = process.argv;
env.localModelPath = modelRoot; env.allowRemoteModels = false;
const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small', { dtype: 'q8' });
const buf = fs.readFileSync(rawPath);
const audio = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
const out = await asr(audio, { language: 'spanish', task: 'transcribe', chunk_length_s: 30, stride_length_s: 5, return_timestamps: mode === 'word' ? 'word' : true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
console.log(out.text);
