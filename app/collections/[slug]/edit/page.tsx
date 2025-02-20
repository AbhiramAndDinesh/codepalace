import {
  getAddtoCollectionQuestions,
  getCollectionbySlug,
  isOwner,
} from "@/actions/collection";
import { auth } from "@/auth";
import Render1 from "./_components/render1";

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
  if (!owner && !collectiondata.isPublic) {
    return <div>This is a private Collection</div>;
  }
  const problems = await getAddtoCollectionQuestions(
    collectiondata.collection_id,
    user_id
  );
  console.log(problems);
  return (
    <div className="p-5 overflow-hidden">
      <Render1
        title={collectiondata.name || ""}
        user_id={user_id}
        collection_id={collectiondata.collection_id}
      />
    </div>
  );
}
