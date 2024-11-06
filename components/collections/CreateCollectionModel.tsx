"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createCollection } from "@/actions/collection";
import { Label } from "../ui/label";

const CreateCollection = ({ user_id }: { user_id: string }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const onCreate = async () => {
    console.log({ name, user_id });
    await createCollection({ name, user_id, slug });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Collection</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
          <DialogDescription>Enter collection name</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="name" onChange={(e) => setName(e.target.value)} />
            <Input onChange={(e) => setSlug(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
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
