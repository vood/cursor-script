"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Props for the TwitterEmbed component
 */
interface TwitterEmbedProps {
  /** Twitter tweet ID (required) */
  tweetId: string;
  /** Twitter handle/username (optional, but recommended) */
  username?: string;
  /** Theme for the embedded tweet (default: light) */
  theme?: "light" | "dark";
  /** Hide conversation (default: false) */
  hideConversation?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TwitterEmbed component for embedding tweets in MDX files
 * @param props Component props
 * @returns Embedded tweet
 */
export const TwitterEmbed: React.FC<TwitterEmbedProps> = ({
  tweetId,
  username,
  theme = "light",
  hideConversation = false,
  className,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tweetRef = useRef<HTMLDivElement>(null);

  if (!tweetId) {
    console.warn("TwitterEmbed: tweetId is required");
    return null;
  }

  useEffect(() => {
    // Reset state
    setLoading(true);
    setError(null);

    // Function to load the Twitter widget script
    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).twttr) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load Twitter widget script"));
        document.body.appendChild(script);
      });
    };

    // Function to render the tweet
    const renderTweet = async () => {
      try {
        await loadScript();

        if (!tweetRef.current || !(window as any).twttr?.widgets) {
          throw new Error("Twitter widget not available");
        }

        // Clear previous content
        tweetRef.current.innerHTML = "";

        // Create a new blockquote element
        const blockquote = document.createElement("blockquote");
        blockquote.className = "twitter-tweet";
        blockquote.setAttribute("data-theme", theme);
        blockquote.setAttribute(
          "data-conversation",
          hideConversation ? "none" : "all"
        );

        // Construct the URL with the username if provided
        const tweetUrl = username
          ? `https://twitter.com/${username}/status/${tweetId}`
          : `https://twitter.com/i/status/${tweetId}`;

        // Add anchor with the tweet URL
        const anchor = document.createElement("a");
        anchor.href = tweetUrl;
        anchor.textContent = "Loading Tweet...";
        blockquote.appendChild(anchor);

        // Append to container
        tweetRef.current.appendChild(blockquote);

        // Render the tweet
        await (window as any).twttr.widgets.load(tweetRef.current);

        // Check if tweet was actually rendered
        setTimeout(() => {
          if (tweetRef.current && !tweetRef.current.querySelector("iframe")) {
            setError(
              "Tweet could not be loaded. Check the tweet ID and username."
            );
          }
        }, 3000);

        setLoading(false);
      } catch (err) {
        console.error("Error rendering tweet:", err);
        setError(
          `Failed to load tweet: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setLoading(false);
      }
    };

    renderTweet();

    // Cleanup function
    return () => {
      // No specific cleanup needed
    };
  }, [tweetId, username, theme, hideConversation]);

  // Container style
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0",
    width: "100%",
    minHeight: "200px", // Min height to avoid layout shifts
  };

  // Error message style
  const errorStyle: React.CSSProperties = {
    color: "#e53e3e",
    margin: "1rem 0",
    padding: "1rem",
    border: "1px solid #e53e3e",
    borderRadius: "0.25rem",
    backgroundColor: "#fff5f5",
    width: "100%",
    maxWidth: "550px",
  };

  return (
    <div
      className={`twitter-embed-container ${className || ""}`}
      style={containerStyle}
    >
      {loading && <div>Loading tweet...</div>}
      {error && (
        <div style={errorStyle}>
          <p>
            <strong>Error:</strong> {error}
          </p>
          <p>
            URL:{" "}
            {username
              ? `https://twitter.com/${username}/status/${tweetId}`
              : `https://twitter.com/i/status/${tweetId}`}
          </p>
          <p>
            <a
              href={
                username
                  ? `https://twitter.com/${username}/status/${tweetId}`
                  : `https://twitter.com/i/status/${tweetId}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3182ce" }}
            >
              View tweet directly on Twitter
            </a>
          </p>
        </div>
      )}
      <div ref={tweetRef}></div>
    </div>
  );
};
