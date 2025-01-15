"use client";
import {
  deleteCollection,
  makePrivate,
  makePublic,
  saveCollection,
  unsaveCollection,
} from "@/actions/collection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  LockKeyholeOpen,
  Save,
  SaveOff,
  Trash2,
} from "lucide-react";
const CollectionButton = ({
  owner,
  ispublic,
  saved,
  user_id,
  collection_id,
}: {
  owner: boolean;
  ispublic: boolean;
  saved: boolean;
  user_id: string;
  collection_id: string;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteCollection({ user_id, collection_id });
    if (!res) {
      toast.error("Failed to Delete the collection");
    }
    if (res?.status === 200) {
      toast.success("Collection has been deleted");
      router.push("/collections");
    }
  };
  const handlePublic = async () => {
    const res = await makePublic({ user_id, collection_id });
    if (!res) {
      toast.error("Failed to set the Collection Public");
    }
    if (res?.status === 200) {
      toast.success("Collection set to Public");
      router.refresh();
    }
  };
  const handlePrivate = async () => {
    const res = await makePrivate({ user_id, collection_id });
    if (!res) {
      toast.error("Failed to set the Collection Private");
    }
    if (res?.status === 200) {
      toast.success("Collection set to Private");
      router.refresh();
    }
  };
  const handleUnsave = async () => {
    const res = await unsaveCollection(user_id, collection_id);
    if (!res) {
      toast.error("Failed to remove collection");
    }
    if (res?.status == 200) {
      toast.success("Removed collection from saved list");
      router.refresh();
    }
  };
  const handleSave = async () => {
    const res = await saveCollection(user_id, collection_id);
    if (!res) {
      toast.error("Failed to Save Collection");
    }
    if (res?.status == 200) {
      toast.success("Saved collection");
      router.refresh();
    }
  };
  return (
    <div className="flex justify-end items-center gap-2">
      {owner && (
        <Button
          className="p-2 h-6 w-6"
          variant={"red"}
          onClick={() => {
            handleDelete();
            console.log("Deleted");
          }}
        >
          <Trash2 />
        </Button>
      )}
      {owner && ispublic && (
        <Button
          className="p-2 h-6 w-6"
          variant={"red"}
          onClick={() => {
            handlePrivate();
          }}
        >
          <LockKeyhole />
        </Button>
      )}
      {owner && !ispublic && (
        <Button
          className="p-2 h-6 w-6"
          variant={"red"}
          onClick={() => {
            handlePublic();
          }}
        >
          <LockKeyholeOpen />
        </Button>
      )}
      {!owner && saved && (
        <Button className="px-2" variant={"red"} onClick={handleUnsave}>
          <SaveOff size={20} />
          Unsave
        </Button>
      )}
      {!owner && !saved && (
        <Button className="px-2" variant={"red"} onClick={handleSave}>
          <Save size={20} />
          Save
        </Button>
      )}
    </div>
  );
};
export default CollectionButton;
