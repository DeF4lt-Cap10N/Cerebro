import { useEffect, useRef } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function getYouTubeEmbedUrl(link: string) {
  try {
    const url = new URL(link);

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.slice(1).split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }

    if (url.pathname.startsWith("/live/")) {
      const videoId = url.pathname.split("/live/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.pathname.startsWith("/embed/")) {
      return link;
    }

    return "";
  } catch {
    return "";
  }
}

export function Card({ title, link, type }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "twitter") {
      const loadTwitterScript = () => {
        if ((window as any).twttr) {
          (window as any).twttr.widgets.load(containerRef.current);
        } else {
          const script = document.createElement("script");
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          document.body.appendChild(script);
          script.onload = () => {
            if ((window as any).twttr) {
              (window as any).twttr.widgets.load(containerRef.current);
            }
          };
        }
      };
      loadTwitterScript();
    }
  }, [type, link]);

  const embedUrl = type === "youtube" ? getYouTubeEmbedUrl(link) : "";

  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank" rel="noreferrer">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div className="pt-4" ref={containerRef}>
          {type === "youtube" && embedUrl ? (
            <iframe
              className="w-full h-48"
              src={embedUrl}
              title={title || "YouTube video player"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : type === "youtube" ? (
            <p className="text-red-500">Invalid or missing YouTube URL</p>
          ) : null}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")} />
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}