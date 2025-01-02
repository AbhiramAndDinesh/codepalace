import { auth } from "@/auth";
import {
  getUserPrivateCollections,
  getUserSavedCollections,
} from "@/actions/collection";

import ShowCollections from "@/components/collections/ShowCollections";

interface Collection {
  collection_id: string;
  name: string;
  isPublic: boolean;
  saved: number;
  owner_id: string;
  slug: string;
}

const CollectionsPage = async () => {
  const session = await auth();
  let privateCollections: Collection[] | undefined = [];
  let publicCollections: Collection[] | undefined = [];
  if (session && session.user) {
    privateCollections = await getUserPrivateCollections({
      user_id: session.user.id!,
    });
    publicCollections = await getUserSavedCollections({
      user_id: session.user.id!,
    });
  }

  if (!session || !session.user) return <div>No user is logged in</div>;
  return (
    <div>
      <ShowCollections
        privateCollections={privateCollections || []}
        publicCollections={publicCollections || []}
        user_id={session.user.id || ""}
      />
    </div>
  );
};

export default CollectionsPage;
