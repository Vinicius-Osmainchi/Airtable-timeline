import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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

const portalContainerStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 50,
};

export function TimelineItem({ item, onUpdateItem }: TimelineItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({});

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

  const handleDoubleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const inputMinWidth = 200;
      const viewportWidth = window.innerWidth;

      let finalLeft = rect.left;

      if (rect.left + inputMinWidth > viewportWidth) {
        const padding = 16;

        finalLeft = viewportWidth - inputMinWidth - padding;
      }

      setPortalStyle({
        top: rect.top,
        left: finalLeft,
        height: rect.height,

        width: rect.width,
      });

      setIsEditing(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setName(item.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return createPortal(
      <div style={{ ...portalContainerStyle, ...portalStyle }}>
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="h-full min-w-[200px] bg-primary/90 text-primary-foreground border-0 focus-visible:ring-offset-primary"
        />
      </div>,
      document.body
    );
  }
  return (
    <Tooltip>
      <TooltipTrigger className="h-full w-full" asChild>
        <Card
          ref={cardRef}
          onDoubleClick={handleDoubleClick}
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
