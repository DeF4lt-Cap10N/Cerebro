import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function SharePage(): JSX.Element {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shareLink) {
      axios
        .get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
        .then((response) => {
          setContent(response.data.content);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch shared content", error);
          setLoading(false);
        });
    }
  }, [shareLink]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-600">
        <p className="text-xl font-medium">Loading shared content...</p>
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-600">
        <p className="text-xl font-medium">No content found for this link. 🤔</p>
      </div>
    );
  }

  return (
   
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <header className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Shared Brain
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          A collection of curated content.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {content.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              link={item.link}
              type={item.type}
            />
          ))}
        </div>
      </main>
    </div>
  );
}