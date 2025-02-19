import {
  getCollectionbySlug,
  getCollectionQuestions,
  isCollectionPublic,
  isOwner,
  isSavedCollection,
} from "@/actions/collection";
import { auth } from "@/auth";
import CollectionButton from "./_components/collectionbutton";
import GridExample from "./ag-grid";
import OwnerDataTable from "./ag-grid-owner";

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
  console.log(user_id);
  const { slug } = await params;
  const collectiondata = await getCollectionbySlug(slug);
  if (!collectiondata) {
    return <div>Collection doesnt exists</div>;
  }
  const owner = await isOwner(user_id, collectiondata.collection_id);
  const ispublic = await isCollectionPublic(
    user_id,
    collectiondata.collection_id
  );
  const saved = await isSavedCollection(user_id, collectiondata.collection_id);
  if (saved === undefined) {
    return;
  }
  if (!owner && !collectiondata.isPublic) {
    return <div>This is a private Collection</div>;
  }
  const problems = await getCollectionQuestions(
    collectiondata.collection_id,
    user_id
  );
  console.log(problems);
  return (
    <div className="p-5 overflow-hidden">
      <div className="w-full flex flex-col sm:mt-20 mt-12  gap-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className=" text-4xl font-semibold font-spaceGrotesk text-red-500  ">
            {collectiondata?.name}
          </h2>
          <div className="flex items-center justify-end gap-2">
            {/* <Addquestion data={problems} /> */}
            {/* <ShareButton /> */}
            <CollectionButton
              owner={owner}
              ispublic={ispublic}
              saved={saved}
              user_id={user_id}
              collection_id={collectiondata.collection_id}
            />
          </div>
        </div>
        <div className="h-[75vh]">
          {owner ? (
            <OwnerDataTable data={problems || []} />
          ) : (
            <GridExample data={problems || []} />
          )}
        </div>
      </div>
    </div>
  );
}
