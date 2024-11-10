const VideoPage = async ({ url }: { url: string }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <video src={url} className="w-[1000px] h-[600px]" controls />
    </div>
  );
};

export default VideoPage;
