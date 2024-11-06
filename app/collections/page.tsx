import { auth } from "@/auth";

const CollectionsPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default CollectionsPage;
