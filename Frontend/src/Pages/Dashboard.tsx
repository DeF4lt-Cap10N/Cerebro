import { useEffect, useState, type JSX } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface ContentItem {
  _id: string;
  type: "twitter" | "youtube";
  link: string;
  title: string;
}

interface UseContentHook {
    contents: ContentItem[];
    refresh: () => void;
}

export function Dashboard(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { contents, refresh } = useContent() as UseContentHook;
  const [activeFilter, setActiveFilter] = useState<"all" | "twitter" | "youtube">("all");

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = contents.filter((item) => {
    if (activeFilter === "all") {
      return true;
    }
    return item.type === activeFilter;
  });

  return (
    <div>
    
      <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              const token = localStorage.getItem("token");
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                { headers: { Authorization: token } }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            {filteredContents.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}