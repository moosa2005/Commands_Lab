import type { YouTubeVideo } from '../../types/youtube';
import { Play } from 'lucide-react';

export interface VideoPlayerProps {
  video: YouTubeVideo | null;
  isLoading: boolean;
}

export default function VideoPlayer({ video, isLoading }: VideoPlayerProps) {
  if (isLoading) {
    return (
      <div className="video-player-container">
        <div className="video-wrapper skeleton-player skeleton"></div>
        <div className="now-playing-info">
          <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '80%', height: '28px' }}></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="now-playing-info">
        <div className="now-playing-badge">
          <Play size={14} fill="currentColor" />
          Now Playing
        </div>
        <h2 className="now-playing-title">{video.title}</h2>
        <div className="now-playing-channel">{video.channelTitle}</div>
      </div>
    </div>
  );
}
