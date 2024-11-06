import {
  addProblemToCollection,
  getCollectionbySlug,
  isOwner,
  isSavedCollection,
} from "@/actions/collection";
import { auth } from "@/auth";
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
  // console.log(collectiondata);
  // console.log(owner);
  // const arr = [
  //   {
  //     collection_id: "cm35j41iw00036un6n3guzm90",
  //     problem_id: 1,
  //   },
  //   {
  //     collection_id: "cm35j41iw00036un6n3guzm90",
  //     problem_id: 2,
  //   },
  //   {
  //     collection_id: "cm35j41iw00036un6n3guzm90",
  //     problem_id: 3,
  //   },
  // ];
  // await addProblemToCollection(arr);
  const saved = await isSavedCollection(user_id, collectiondata.collection_id);
  console.log(saved);
  if (saved === undefined) {
    return;
  }
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
