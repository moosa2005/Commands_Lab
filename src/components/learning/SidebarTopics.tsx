export interface SidebarTopicsProps {
  topics: string[];
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export default function SidebarTopics({ topics, selectedTopic, onSelectTopic }: SidebarTopicsProps) {
  return (
    <div className="learning-sidebar">
      <div className="topics-list">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-item ${selectedTopic === topic ? 'active' : ''}`}
            onClick={() => onSelectTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
