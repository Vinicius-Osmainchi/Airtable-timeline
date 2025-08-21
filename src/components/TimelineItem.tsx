import { useState, useRef, useEffect } from "react";
import { type ItemData as Item } from "@/data/timelineItems";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface TimelineItemProps {
  item: Item;
  onUpdateItem: (id: number, newName: string) => void;
}

export function TimelineItem({ item, onUpdateItem }: TimelineItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (name.trim() && name.trim() !== item.name) {
      onUpdateItem(item.id, name.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setName(item.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-full"
      />
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer" asChild>
        <Card
          onDoubleClick={() => setIsEditing(true)}
          className="h-full flex items-start bg-primary text-primary-foreground overflow-hidden hover:opacity-80 transition-opacity cursor-pointer p-0"
        >
          <CardContent className="w-full h-full flex items-center px-3">
            <CardTitle className="text-sm truncate">{item.name}</CardTitle>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.name}</p>
        <p>
          {item.start} a {item.end}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
