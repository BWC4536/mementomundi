#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import ffmpegStatic from 'ffmpeg-static'
import ffprobeStatic from 'ffprobe-static'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.join(__dirname, '..')
const VIDEO_PATH = path.join(PROJECT_ROOT, 'public', 'memento_sticker.mp4')
const FRAMES_DIR = path.join(PROJECT_ROOT, 'public', 'frames')
const TOTAL_FRAMES = 90
const FRAME_QUALITY = 82
const MAX_WIDTH = 1280

// ─── Obtener ruta a ffmpeg y ffprobe ──────────────────────────────────────
function getFFmpegPaths() {
  const ffmpeg = ffmpegStatic
  const ffprobe = ffprobeStatic.path

  if (!ffmpeg || !ffprobe) {
    console.error('❌ ffmpeg-static o ffprobe-static no están disponibles.')
    console.error('   Ejecuta: npm install ffmpeg-static ffprobe-static --save-dev')
    process.exit(1)
  }

  return { ffmpeg, ffprobe }
}

// ─── Verificar que ffmpeg y ffprobe funcionan ─────────────────────────────
function checkFFmpeg() {
  const { ffmpeg, ffprobe } = getFFmpegPaths()

  try {
    execSync(`"${ffmpeg}" -version`, { stdio: 'pipe' })
    execSync(`"${ffprobe}" -version`, { stdio: 'pipe' })
    console.log('✅ ffmpeg y ffprobe disponibles (via ffmpeg-static)')
  } catch (err) {
    console.error('❌ ffmpeg o ffprobe no funcionan:', err.message)
    process.exit(1)
  }

  return { ffmpeg, ffprobe }
}

// ─── Obtener duración del video ───────────────────────────────────────────
function getVideoDuration(videoPath, ffprobePath) {
  try {
    const output = execSync(
      `"${ffprobePath}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
      { encoding: 'utf8' }
    ).trim()
    return parseFloat(output)
  } catch (err) {
    console.error('❌ Error al leer la duración del video:', err.message)
    process.exit(1)
  }
}

// ─── Crear directorio de frames ────────────────────────────────────────────
function ensureFramesDir() {
  if (!fs.existsSync(FRAMES_DIR)) {
    fs.mkdirSync(FRAMES_DIR, { recursive: true })
    console.log(`📁 Creado directorio: ${FRAMES_DIR}`)
  }
}

// ─── Preguntar si sobrescribir frames existentes ───────────────────────────
function checkExistingFrames() {
  const files = fs.readdirSync(FRAMES_DIR).filter(f => f.startsWith('frame_') && f.endsWith('.webp'))
  if (files.length > 0) {
    console.warn(`⚠️  Ya existen ${files.length} frames en ${FRAMES_DIR}`)
    console.warn('   Eliminando frames existentes...')
    files.forEach(f => fs.unlinkSync(path.join(FRAMES_DIR, f)))
  }
}

// ─── Extraer frames ───────────────────────────────────────────────────────
function extractFrames(videoPath, duration, ffmpegPath) {
  const fps = TOTAL_FRAMES / duration
  console.log(`⏱️  Duración del video: ${duration.toFixed(2)}s`)
  console.log(`📹 FPS calculado: ${fps.toFixed(2)} (para ${TOTAL_FRAMES} frames)`)
  console.log(`🎞️  Extrayendo ${TOTAL_FRAMES} frames en WebP @ q${FRAME_QUALITY}...`)

  const ffmpegCmd = `"${ffmpegPath}" -i "${videoPath}" -vf "fps=${fps},scale=${MAX_WIDTH}:-1" -c:v libwebp -quality ${FRAME_QUALITY} -y "${FRAMES_DIR}/frame_%04d.webp"`

  try {
    execSync(ffmpegCmd, { stdio: 'inherit', maxBuffer: 10 * 1024 * 1024 })
  } catch (err) {
    console.error('❌ Error durante extracción:', err.message)
    process.exit(1)
  }
}

// ─── Verificar frames extraídos ────────────────────────────────────────────
function verifyFrames() {
  const files = fs.readdirSync(FRAMES_DIR)
    .filter(f => f.startsWith('frame_') && f.endsWith('.webp'))
    .sort()

  if (files.length !== TOTAL_FRAMES) {
    console.warn(`⚠️  Se extrajeron ${files.length} frames, esperábamos ${TOTAL_FRAMES}`)
  }

  if (files.length === 0) {
    console.error('❌ No se extrajeron frames. Verifica que el video es válido.')
    process.exit(1)
  }

  // Calcular tamaño total
  let totalSize = 0
  files.forEach(f => {
    const size = fs.statSync(path.join(FRAMES_DIR, f)).size
    totalSize += size
  })

  const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2)
  console.log(`✅ ${files.length} frames extraídos en ${FRAMES_DIR}`)
  console.log(`📦 Tamaño total: ${sizeInMB}MB`)
  console.log(`✨ ¡Listo! Los frames están en: public/frames/`)
}

// ─── Main ─────────────────────────────────────────────────────────────────
function main() {
  console.log('🎬 Extractor de Frames — MementoMundi\n')

  // Verificar que el video existe
  if (!fs.existsSync(VIDEO_PATH)) {
    console.error(`❌ Video no encontrado: ${VIDEO_PATH}`)
    process.exit(1)
  }
  console.log(`✅ Video encontrado: ${VIDEO_PATH}\n`)

  // Verificar ffmpeg y obtener rutas
  const { ffmpeg, ffprobe } = checkFFmpeg()
  console.log()

  // Crear directorio
  ensureFramesDir()

  // Limpiar frames existentes
  checkExistingFrames()

  // Extraer frames
  const duration = getVideoDuration(VIDEO_PATH, ffprobe)
  extractFrames(VIDEO_PATH, duration, ffmpeg)

  // Verificar resultado
  verifyFrames()
}

main()
