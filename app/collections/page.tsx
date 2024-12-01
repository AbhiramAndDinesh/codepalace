import { auth } from "@/auth";
import Link from "next/link";

import {
  getUserPrivateCollections,
  getUserSavedCollections,
} from "@/actions/collection";
import CreateCollectionModel from "@/components/collections/CreateCollectionModel";

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
      <h1>
        {session.user.email} {session.user.id}
      </h1>
      <CreateCollectionModel user_id={session.user.id!} />

      <div>
        <h1 className="text-3xl">Private Collections</h1>
        {privateCollections?.map((collection, index) => {
          return (
            <Link key={index} href={`/collections/${collection.slug}`}>
              {collection.name}
            </Link>
          );
        })}
        <h1 className="text-3xl">Public Collections</h1>
        {publicCollections?.map((collection, index) => {
          return (
            <Link key={index} href={`/collections/${collection.slug}`}>
              {collection.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsPage;
