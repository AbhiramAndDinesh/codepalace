import {
  getCollectionbySlug,
  isOwner,
  isSavedCollection,
} from "@/actions/collection";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import CollectionButton from "./_components/collectionbutton";
export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session) {
    return <div>User not found sign in!!</div>;
  }
  const user_id = session.user?.id || "";
  const { slug } = await params;
  const collectiondata = await getCollectionbySlug(slug);
  if (!collectiondata) {
    return <div>Collection doesnt exists</div>;
  }
  const owner = await isOwner(user_id, collectiondata.collection_id);
  console.log(collectiondata);
  console.log(owner);
  const saved = await isSavedCollection(user_id, collectiondata.collection_id);
  if (!owner && !collectiondata.isPublic) {
    return <div>This is a private Collection</div>;
  }
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <p>Collection Name :{collectiondata?.name}</p>
      <CollectionButton
        owner={owner}
        saved={saved}
        user_id={user_id}
        collection_id={collectiondata.collection_id}
      />
      {/* {owner ? <Button>Delete</Button> : <Button>Unsave</Button>} */}
      <p>Problems: TODO</p>
    </div>
  );
}
