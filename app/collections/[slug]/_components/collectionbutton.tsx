"use client";
import {
  deleteCollection,
  saveCollection,
  unsaveCollection,
} from "@/actions/collection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const CollectionButton = ({
  owner,
  saved,
  user_id,
  collection_id,
}: {
  owner: boolean;
  saved: boolean;
  user_id: string;
  collection_id: string;
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    deleteCollection({ user_id, collection_id });
  };
  const handleUnsave = async () => {
    const res = await unsaveCollection(user_id, collection_id);
    if (!res) {
      toast.error("Failed to Unsave COllection");
    }
    if (res?.status == 200) {
      toast.success("Successfully unsaved Collection");
      router.refresh();
    }
  };
  const handleSave = async () => {
    const res = await saveCollection(user_id, collection_id);
    if (!res) {
      toast.error("Failed to Save Collection");
    }
    if (res?.status == 200) {
      toast.success("Successfully unsaved Collection");
      router.refresh();
    }
  };
  return (
    <div>
      {owner && (
        <Button
          onClick={() => {
            handleDelete();
            console.log("Deleted");
          }}
        >
          Delete
        </Button>
      )}
      {!owner && saved && <Button onClick={handleUnsave}>Unsave</Button>}
      {!owner && !saved && <Button onClick={handleSave}>Save</Button>}
    </div>
  );
};
export default CollectionButton;
