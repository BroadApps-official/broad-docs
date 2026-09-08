"use client";

import { useEffect, useRef, useState } from "react";

function timestamp(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

export function PaywallVideo({ src, title }: { src: string; title: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [captions, setCaptions] = useState(false);
  const base = src.replace(/\.mp4$/i, "");

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const syncDuration = () => setDuration(element.duration);
    const syncFullscreen = () => setExpanded(document.fullscreenElement === player.current);
    // Metadata may finish loading before the server-rendered player hydrates.
    element.addEventListener("loadedmetadata", syncDuration);
    element.addEventListener("durationchange", syncDuration);
    document.addEventListener("fullscreenchange", syncFullscreen);
    syncDuration();
    return () => {
      element.removeEventListener("loadedmetadata", syncDuration);
      element.removeEventListener("durationchange", syncDuration);
      document.removeEventListener("fullscreenchange", syncFullscreen);
    };
  }, []);

  async function togglePlayback() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    try {
      await element.play();
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  async function fullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    const element = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (player.current?.requestFullscreen) {
      await player.current.requestFullscreen().catch(() => element?.webkitEnterFullscreen?.());
    } else {
      element?.webkitEnterFullscreen?.();
    }
  }

  return (
    <div className="paywall-player" ref={player}>
      <div className="paywall-player-screen">
        <video
          aria-label={title}
          ref={video}
          playsInline
          preload="metadata"
          poster={`${base}.jpg`}
          onLoadedMetadata={() => setDuration(video.current?.duration ?? 0)}
          onDurationChange={() => setDuration(video.current?.duration ?? 0)}
          onTimeUpdate={() => setPosition(video.current?.currentTime ?? 0)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
          <track kind="captions" src={`${base}.vtt`} srcLang="ru" label="Действия на экране" />
        </video>
      </div>
      <div className="paywall-player-controls" role="group" aria-label={`Управление: ${title}`}>
        <div className="paywall-player-buttons">
          <button type="button" onClick={togglePlayback} aria-label={`${playing ? "Пауза" : "Воспроизвести"}: ${title}`} title={playing ? "Пауза" : "Воспроизвести"}>
            <svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <path d="M7 5h4v14H7zm6 0h4v14h-4z" /> : <path d="m8 4 13 8-13 8z" />}</svg>
          </button>
          <output aria-label={`Время: ${title}`}>{timestamp(position)} / {timestamp(duration)}</output>
          <button type="button" onClick={fullscreen} aria-label={`${expanded ? "Выйти из полного экрана" : "На весь экран"}: ${title}`} title={expanded ? "Выйти из полного экрана" : "На весь экран"}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z" /></svg>
          </button>
        </div>
        <input
          type="range"
          min="0"
          max={Number.isFinite(duration) ? duration : 0}
          step="0.1"
          value={position}
          disabled={!Number.isFinite(duration) || duration <= 0}
          aria-label={`Перемотка: ${title}`}
          aria-valuetext={`${timestamp(position)} из ${timestamp(duration)}`}
          onChange={(event) => {
            const value = Number(event.currentTarget.value);
            if (video.current) video.current.currentTime = value;
            setPosition(value);
          }}
        />
        <button className="paywall-player-captions" type="button" aria-label={`Подписи: ${title}`} aria-pressed={captions} onClick={() => {
          const enabled = !captions;
          if (video.current) {
            for (const track of Array.from(video.current.textTracks)) track.mode = enabled ? "showing" : "disabled";
          }
          setCaptions(enabled);
        }}>Подписи</button>
        {failed && <a className="paywall-player-error" href={src}>Открыть видео</a>}
      </div>
    </div>
  );
}
