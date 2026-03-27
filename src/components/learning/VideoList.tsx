import type { YouTubeVideo } from '../../types/youtube';
import VideoCard from './VideoCard';

export interface VideoListProps {
  videos: YouTubeVideo[];
  selectedVideo: YouTubeVideo | null;
  onSelectVideo: (video: YouTubeVideo) => void;
  isLoading: boolean;
}

export default function VideoList({ videos, selectedVideo, onSelectVideo, isLoading }: VideoListProps) {
  if (isLoading) {
    return (
      <div>
        <h3 className="video-list-header">Up Next</h3>
        <div className="video-grid">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="video-card">
              <div className="video-thumbnail skeleton"></div>
              <div className="video-info">
                <div className="skeleton skeleton-text" style={{ marginBottom: '8px' }}></div>
                <div className="skeleton skeleton-text short" style={{ height: '14px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (videos.length <= 1) return null;

  return (
    <div>
      <h3 className="video-list-header">More Videos</h3>
      <div className="video-grid">
        {videos.filter(v => v.id !== selectedVideo?.id).map(video => (
          <VideoCard 
            key={video.id}
            video={video}
            isActive={false}
            onClick={onSelectVideo}
          />
        ))}
      </div>
    </div>
  );
}
