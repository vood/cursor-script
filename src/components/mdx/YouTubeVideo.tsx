import React from "react";

/**
 * Props for the YouTubeVideo component
 */
interface YouTubeVideoProps {
  /** YouTube video ID (required) */
  videoId: string;
  /** Video title for accessibility */
  title?: string;
  /** Width of the video player (default: 560) */
  width?: number;
  /** Height of the video player (default: 315) */
  height?: number;
}

/**
 * YouTubeVideo component for embedding YouTube videos in MDX files
 * @param props Component props
 * @returns Embedded YouTube video
 */
export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title,
  width = 560,
  height = 315,
}) => {
  if (!videoId) {
    console.warn("YouTubeVideo: videoId is required");
    return null;
  }

  // Responsive container style
  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    paddingTop: "56.25%", // 16:9 Aspect Ratio
    marginBottom: "2rem",
  };

  // Responsive iframe style
  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    border: "none",
  };

  return (
    <div className="youtube-video-container" style={containerStyle}>
      <iframe
        style={iframeStyle}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || `YouTube video player for ${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
