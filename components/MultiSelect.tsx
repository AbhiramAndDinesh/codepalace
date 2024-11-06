// src/components/multi-select.tsx

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { useUser } from "@/context/userContext";
import { addProblemToCollection } from "@/actions/collection";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getUserPrivateCollections2 } from "@/actions/collection";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
// const multiSelectVariants = cva(
//   "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
//   {
//     variants: {
//       variant: {
//         default:
//           "border-foreground/10 text-foreground bg-card hover:bg-card/80",
//         secondary:
//           "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         destructive:
//           "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
//         inverted: "inverted",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps {
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];

  placeholder?: string;

  modalPopover?: boolean;

  asChild?: boolean;

  className?: string;

  problem_id: number;
}

interface CollectionType {
  name: string;
  collection_id: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(({ onValueChange, defaultValue = [], modalPopover = false, problem_id }) => {
  // const options = []
  const { id } = useUser();
  const [collections, setCollections] = React.useState<
    CollectionType[] | undefined
  >([]);
  React.useEffect(() => {
    const getColls = async () => {
      const x = await getUserPrivateCollections2({ user_id: id! });
      setCollections(x);
    };
    if (id) {
      getColls();
    }
  }, [id]);
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsPopoverOpen(true);
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues];
      newSelectedValues.pop();
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    }
  };

  const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      modal={modalPopover}
    >
      <PopoverTrigger asChild>
        <Button className="p-2 bg-black text-2xl">+</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {collections?.map((collection) => {
                const isSelected = selectedValues.includes(
                  collection.collection_id,
                );
                return (
                  <CommandItem
                    key={collection.collection_id}
                    onSelect={() => toggleOption(collection.collection_id)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>

                    <span>{collection.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandGroup>
              <div className="flex items-center justify-between">
                {
                  <>
                    <CommandItem
                      onSelect={() => {
                        addProblemToCollection(selectedValues, problem_id);
                        setIsPopoverOpen(false);
                      }}
                      className="flex-1 justify-center cursor-pointer bg-black text-white"
                    >
                      Submit
                    </CommandItem>
                  </>
                }
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

MultiSelect.displayName = "MultiSelect";
