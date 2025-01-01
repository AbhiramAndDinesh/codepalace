import { auth } from "@/auth";
import Link from "next/link";
import {
  getUserPrivateCollections,
  getUserSavedCollections,
} from "@/actions/collection";
import CreateCollectionModel from "@/components/collections/CreateCollectionModel";
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
  const arraylength = privateCollections?.length || 0;
  return (
    <div>
      <CreateCollectionModel user_id={session.user.id!} />
      <div>
        <ShowCollections
          privateCollections={privateCollections || []}
          publicCollections={publicCollections || []}
        />
        {/* <h1 className="text-3xl">Public Collections</h1>
        {publicCollections?.map((collection, index) => {
          return (
            <Link key={index} href={`/collections/${collection.slug}`}>
              {collection.name}
            </Link>
          );
        })} */}
      </div>
    </div>
  );
};

export default CollectionsPage;
