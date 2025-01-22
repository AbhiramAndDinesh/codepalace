"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
const CreateCollection = ({ user_id }: { user_id: string }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const onCreate = async () => {
    console.log({ name, user_id });

    try {
      const res = await createCollection({ name, user_id, slug });
      if (res?.status === 200) {
        toast.success("Collection Created Successfully");
        router.refresh();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to create Collection.");
    } finally {
      setName("");
      setSlug("");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"red"}
          className="text-sm px-2 py-1 h-8 flex gap-0"
          // className=" text-sm border border-red-500/80 bg-red-500/20 text-red-500 hover:bg-red-500/20"
        >
          New
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-red-500">
        <DialogHeader>
          <DialogTitle className="font-spaceGrotesk text-gray-300">
            Create Collection
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
              placeholder="Collection Name"
            />
            <Input
              onChange={(e) => setSlug(e.target.value)}
              className="bg-white"
              placeholder="Unique slug name"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-red-500/20 border border-red-500/80 text-red-500"
              disabled={!(name.length > 0 && slug.length > 0)}
              onClick={() => {
                onCreate();
              }}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollection;
