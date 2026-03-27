import type { YouTubeVideo } from '../../types/youtube';
import { Play } from 'lucide-react';

export interface VideoCardProps {
  video: YouTubeVideo;
  isActive: boolean;
  onClick: (video: YouTubeVideo) => void;
}

export default function VideoCard({ video, isActive, onClick }: VideoCardProps) {
  return (
    <div 
      className={`video-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(video)}
    >
      <div className="video-thumbnail">
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        <div className="play-overlay">
          <Play size={24} className="play-icon" fill="currentColor" />
        </div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <span className="video-channel">{video.channelTitle}</span>
      </div>
    </div>
  );
}
