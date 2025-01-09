import {
  getCollectionbySlug,
  getCollectionQuestions,
  isOwner,
  isSavedCollection,
} from "@/actions/collection";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { columns_owner } from "./columns-owner";
import { auth } from "@/auth";
import CollectionButton from "./_components/collectionbutton";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
  const saved = await isSavedCollection(user_id, collectiondata.collection_id);
  if (saved === undefined) {
    return;
  }
  if (!owner && !collectiondata.isPublic) {
    return <div>This is a private Collection</div>;
  }
  const problems = await getCollectionQuestions(collectiondata.collection_id);
  console.log(problems);
  if (!problems) return;
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <p>Collection Name :{collectiondata?.name}</p>
      <CollectionButton
        owner={owner}
        saved={saved}
        user_id={user_id}
        collection_id={collectiondata.collection_id}
      />
      <p>Problems: TODO</p>
      <div className="max-w-screen-md">
        {owner ? (
          <DataTable columns={columns_owner} data={problems} />
        ) : (
          <DataTable columns={columns} data={problems} />
        )}
      </div>
    </div>
  );
}
