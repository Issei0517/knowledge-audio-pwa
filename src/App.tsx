import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  CheckSquare,
  ChevronRight,
  Clock3,
  Download,
  History,
  Home,
  Pause,
  Play,
  Settings,
  Share2,
  UserRound
} from "lucide-react";
import { Chapter, Narration, narrations } from "./data/narrations";

type Tab = "chapters" | "map";
type Screen = "home" | "detail";
type PlaybackRate = 1 | 1.5 | 2;

const speedOptions: PlaybackRate[] = [1, 1.5, 2];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const ChapterCard = ({
  chapter,
  active,
  onSelect
}: {
  chapter: Chapter;
  active: boolean;
  onSelect: () => void | Promise<void>;
}) => (
  <button className={`chapter-card ${active ? "is-active" : ""}`} onClick={onSelect}>
    <div className="chapter-card__top">
      <span className="chapter-badge">{chapter.label}</span>
      <span className="chapter-time">{formatTime(chapter.startSec)}</span>
    </div>
    <div className="chapter-title-row">
      <h3>{chapter.title}</h3>
      <ChevronRight size={18} strokeWidth={2.4} />
    </div>
    <p>{chapter.summary}</p>
    <div className="point-row">
      {chapter.points.map((point) => (
        <span key={point}>{point}</span>
      ))}
    </div>
  </button>
);

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeNarration, setActiveNarration] = useState<Narration>(narrations[0]);
  const [activeChapter, setActiveChapter] = useState<Chapter>(narrations[0].chapters[0]);
  const [activeTab, setActiveTab] = useState<Tab>("chapters");
  const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const progress = useMemo(() => {
    if (!activeNarration.durationSec) return 0;
    return Math.min(100, (currentTime / activeNarration.durationSec) * 100);
  }, [activeNarration.durationSec, currentTime]);

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.playbackRate = playbackRate;
    }
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const openNarration = (narration: Narration) => {
    resetAudio();
    setActiveNarration(narration);
    setActiveChapter(narration.chapters[0]);
    setActiveTab("chapters");
    setScreen("detail");
  };

  const goHome = () => {
    resetAudio();
    setScreen("home");
  };

  const changePlaybackRate = (rate: PlaybackRate) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
    }
    setPlaybackRate(rate);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.playbackRate = playbackRate;
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const jumpToChapter = async (chapter: Chapter) => {
    const audio = audioRef.current;
    setActiveChapter(chapter);
    if (!audio) return;
    audio.currentTime = chapter.startSec;
    audio.playbackRate = playbackRate;
    setCurrentTime(chapter.startSec);
    await audio.play();
    setIsPlaying(true);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="知識音声 PWA">
        <header className="top-bar">
          <button className="icon-button" aria-label="戻る" onClick={screen === "detail" ? goHome : undefined}>
            <ArrowLeft size={30} />
          </button>
          <h1>オーディオブック</h1>
          <div className="top-actions">
            <button className="action-button">
              <Download size={28} />
              <span>インストール</span>
            </button>
            <button className="action-button">
              <Share2 size={28} />
              <span>共有</span>
            </button>
          </div>
        </header>

        <div className="content">
          {screen === "home" ? (
            <section className="home-screen" aria-label="ホーム">
              <div className="home-heading">
                <h2>ホーム</h2>
                <p>聞きたいお題を選ぶと、章ごとの説明とマップを見ながら再生できます。</p>
              </div>
              <div className="topic-list">
                {narrations.map((item) => (
                  <button key={item.id} className="topic-card" onClick={() => openNarration(item)}>
                    <div>
                      <span className="topic-label">お題</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="topic-meta">
                        <span>
                          <Clock3 size={16} />
                          {formatTime(item.durationSec)}
                        </span>
                        <span>{item.chapters.length}章</span>
                      </div>
                    </div>
                    <div className="cover-card mini" aria-hidden="true">
                      <strong>{item.title}</strong>
                      <span>{item.coverNote}</span>
                      <CheckSquare size={34} strokeWidth={2.4} />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <>
              <section className="topic-header">
                <div>
                  <h2>{activeNarration.title}</h2>
                  <p>
                    <UserRound size={19} />
                    著者: {activeNarration.author}
                  </p>
                  <p>
                    <Clock3 size={19} />
                    再生時間: {formatTime(activeNarration.durationSec)}
                  </p>
                </div>
                <div className="cover-card" aria-label="表紙">
                  <strong>{activeNarration.title}</strong>
                  <span>{activeNarration.coverNote}</span>
                  <CheckSquare size={42} strokeWidth={2.4} />
                </div>
              </section>

              <section className="player-card" aria-label="音声プレイヤー">
                <button className="play-button" onClick={togglePlay} aria-label="再生または停止">
                  {isPlaying ? <Pause fill="white" size={36} /> : <Play fill="white" size={38} />}
                </button>
                <div className="player-main">
                  <div className="time-row">
                    <strong>{formatTime(currentTime)}</strong>
                    <span>/ {formatTime(activeNarration.durationSec)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={activeNarration.durationSec}
                    value={Math.min(currentTime, activeNarration.durationSec)}
                    onChange={(event) => seek(Number(event.target.value))}
                    style={{ "--progress": `${progress}%` } as React.CSSProperties}
                    aria-label="再生位置"
                  />
                </div>
                <div className="speed-selector" aria-label="再生速度">
                  {speedOptions.map((rate) => (
                    <button
                      key={rate}
                      className={playbackRate === rate ? "active" : ""}
                      onClick={() => changePlaybackRate(rate)}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </section>

              <audio
                ref={audioRef}
                src={activeNarration.audioSrc}
                preload="metadata"
                onLoadedMetadata={(event) => {
                  event.currentTarget.playbackRate = playbackRate;
                }}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              <nav className="tab-bar" aria-label="表示切り替え">
                <button
                  className={activeTab === "chapters" ? "active" : ""}
                  onClick={() => setActiveTab("chapters")}
                >
                  章
                </button>
                <button
                  className={activeTab === "map" ? "active" : ""}
                  onClick={() => setActiveTab("map")}
                >
                  マップ
                </button>
              </nav>

              {activeTab === "chapters" ? (
                <section className="chapter-list" aria-label="章一覧">
                  {activeNarration.chapters.map((chapter) => (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      active={chapter.id === activeChapter.id}
                      onSelect={() => jumpToChapter(chapter)}
                    />
                  ))}
                </section>
              ) : (
                <section className="map-section" aria-label="マインドマップ">
                  <div className="map-card">
                    <h3>マインドマップ</h3>
                    <div className="mind-map">
                      <div className="map-center">{activeNarration.mapCenter}</div>
                      {activeNarration.mapNodes.map((node, index) => (
                        <article
                          key={node.title}
                          className={`map-node node-${index + 1} tone-${node.tone}`}
                        >
                          <strong>{node.title}</strong>
                          <span>{node.note}</span>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="jump-list">
                    <h3>タップで章へ移動</h3>
                    {activeNarration.chapters.slice(1, 6).map((chapter) => (
                      <button key={chapter.id} onClick={() => jumpToChapter(chapter)}>
                        <span>
                          {chapter.label} {chapter.title}
                        </span>
                        <strong>{formatTime(chapter.startSec)}</strong>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        <nav className="bottom-nav" aria-label="下部メニュー">
          <button className={screen === "home" ? "active" : ""} onClick={goHome}>
            <Home size={29} fill="currentColor" />
            ホーム
          </button>
          <button>
            <Bookmark size={29} />
            ブックマーク
          </button>
          <button>
            <History size={29} />
            履歴
          </button>
          <button>
            <Settings size={29} />
            設定
          </button>
        </nav>
      </section>
    </main>
  );
}

export default App;
