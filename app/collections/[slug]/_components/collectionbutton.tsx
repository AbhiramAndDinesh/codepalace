"use client";

import { deleteCollection } from "@/actions/collection";
import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";

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
  const handleDelete = async () => {
    deleteCollection({ user_id, collection_id });
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
    </div>
  );
};
export default CollectionButton;
