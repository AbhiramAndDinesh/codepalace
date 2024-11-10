const DocumentPage = async ({ text }: { text: string }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <p>{text}</p>
    </div>
  );
};

export default DocumentPage;
