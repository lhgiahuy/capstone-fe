// src/components/multi-select.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground/10 text-background bg-foreground",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: any[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}
export const TagInput = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      modalPopover = false,
      className,
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [newOption, setNewOption] = useState(""); // New value from the user
    const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;

      if (event.key === "Enter" && value.trim()) {
        addOption(value.trim());
      }
    };

    const addOption = (option: string) => {
      if (!selectedValues.includes(option)) {
        const newSelectedValues = [...selectedValues, option];
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
      setNewOption(""); // Clear input after adding
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    return (
      <DropdownMenu
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              // caveat: :has() variant requires tailwind v3.4 or above: https://tailwindcss.com/blog/tailwindcss-v3-4#new-has-variant
              "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-2 py-1 text-sm ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-background dark:ring-offset-neutral-950",
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <>
                {selectedValues.map((item) => (
                  <Badge
                    key={item}
                    className={cn(
                      "bg-foreground text-background border-foreground/1",
                      multiSelectVariants({ variant })
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    {item}
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleOption(item);
                      }}
                    />
                  </Badge>
                ))}
              </>
            ) : (
              <span
                ref={ref}
                className={cn(
                  "absolute text-sm text-slate-400 mx-3 my-2 transition-opacity duration-300",
                  newOption || isPopoverOpen ? "opacity-0" : "opacity-100"
                )}
              >
                {placeholder}
              </span>
            )}
            <Input
              type="text"
              value={newOption}
              onKeyDown={handleInput} // Handle adding a new option on Enter
              onChange={(e) => setNewOption(e.target.value)} // Synchronize input state
              className="flex-1 outline-none border-0 focus-visible:ring-0"
            />
            {/* Render selected values as badges */}
            {/* {selectedValues.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {selectedValues.slice(0, maxCount).map((value) => (
                  <Badge
                    key={value}
                    className={cn(
                      "bg-foreground text-background border-foreground/1",
                      multiSelectVariants({ variant })
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    {value}
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleOption(value);
                      }}
                    />
                  </Badge>
                ))}
                {selectedValues.length > maxCount && (
                  <Badge
                    className={cn(
                      "bg-foreground text-background border-foreground/1",
                      multiSelectVariants({ variant })
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    {`+ ${selectedValues.length - maxCount} more`}
                  </Badge>
                )}
              </div>
            )} */}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-auto p-0"
          align="start"
          side="bottom"
          avoidCollisions={false}
        >
          <DropdownMenuGroup>
            <h1 className="px-4 py-2">Danh sách tag</h1>
            <Separator></Separator>
            <ScrollArea className="h-64">
              {options?.map((option) => {
                const isSelected = selectedValues.includes(option.tagName);
                return (
                  <DropdownMenuCheckboxItem
                    key={option.tagName}
                    onCheckedChange={() => toggleOption(option.tagName)}
                    className="cursor-pointer"
                    checked={isSelected}
                  >
                    {option.tagName}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </ScrollArea>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

TagInput.displayName = "TagInput";
