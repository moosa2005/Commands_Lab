"use client";

import { useState, useEffect } from 'react';

import * as Icons from 'lucide-react';
import SidebarTopics from '../components/learning/SidebarTopics';
import VideoPlayer from '../components/learning/VideoPlayer';
import VideoList from '../components/learning/VideoList';
import { TOPICS, fetchVideosForTopic } from '../utils/youtube';
import type { YouTubeVideo } from '../types/youtube';


export default function Learning() {

  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0]); // CyberSecurity Fundamental
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Auto scroll to top of main content on mobile when topic changes
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    if (window.innerWidth < 992) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchVideosForTopic(selectedTopic).then((fetchedVideos) => {
      if (isMounted) {
        setVideos(fetchedVideos);
        if (fetchedVideos.length > 0) {
          setSelectedVideo(fetchedVideos[0]);
        } else {
          setSelectedVideo(null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedTopic]);

  return (
    <div className="learning-container">
      <div className="learning-header">
        <h1 className="learning-title">
          Interactive <span className="text-neon">Learning</span>
        </h1>
        <p className="learning-subtitle">Select a cybersecurity topic to watch top-rated tutorials and courses.</p>
      </div>

      <div className="learning-content">
        <SidebarTopics 
          topics={TOPICS} 
          selectedTopic={selectedTopic} 
          onSelectTopic={handleTopicSelect} 
        />
        
        <div className="learning-main">
          <VideoPlayer video={selectedVideo} isLoading={isLoading} />
          <VideoList 
            videos={videos} 
            selectedVideo={selectedVideo} 
            onSelectVideo={(video) => {
                setSelectedVideo(video);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isLoading={isLoading} 
          />
        </div>
      </div>

      <div className="learning-footer">
        <p className="credit-text">
          <Icons.Heart size={14} className="heart-icon" /> All educational content is provided by the original creators via YouTube. 
          Special thanks to <span className="credit-link">freeCodeCamp.org</span>, <span className="credit-link">The Cyber Mentor</span>, 
          <span className="credit-link">NetworkChuck</span>, <span className="credit-link">David Bombal</span>, and many others.
        </p>
      </div>
    </div>
  );
}
