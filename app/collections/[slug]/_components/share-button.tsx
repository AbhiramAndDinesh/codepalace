"use client";

import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

const ShareButton = () => {
  const handleCopy = () => {
    const url_ = window.location.href;
    navigator.clipboard.writeText(url_);
    toast.success("Copied", {
      position: "top-center",
    });
    console.log(url_);
  };
  return (
    <Button
      variant={"red"}
      onClick={handleCopy}
      className="p-2 h-6 w-6"
    >
      <Share />
    </Button>
  );
};
export default ShareButton;
