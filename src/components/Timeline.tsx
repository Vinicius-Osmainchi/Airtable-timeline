import { useMemo } from "react";
import { type TimelineItem } from "@/data/timelineItems";
import { assignLanes } from "@/lib/assignLanes";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const dateDiffInDays = (a: Date, b: Date): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const { lanes, startDate, totalDays } = useMemo(() => {
    if (items.length === 0) {
      return { lanes: [], startDate: new Date(), totalDays: 0 };
    }

    const assignedLanes = assignLanes(items);

    let minDate = new Date(items[0].start);
    let maxDate = new Date(items[0].end);

    for (const item of items) {
      const itemStart = new Date(item.start);
      const itemEnd = new Date(item.end);
      if (itemStart < minDate) minDate = itemStart;
      if (itemEnd > maxDate) maxDate = itemEnd;
    }

    const days = dateDiffInDays(minDate, maxDate) + 1;

    return { lanes: assignedLanes, startDate: minDate, totalDays: days };
  }, [items]);

  if (items.length === 0) {
    return <div>Nenhum item para exibir.</div>;
  }

  return (
    <div className="relative p-4">
      <TooltipProvider>
        {lanes.map((lane, laneIndex) => (
          <div key={laneIndex} className="relative h-20 mb-2">
            {lane.map((item) => {
              const itemStart = new Date(item.start);
              const itemEnd = new Date(item.end);

              const offset = dateDiffInDays(startDate, itemStart);
              const duration = dateDiffInDays(itemStart, itemEnd) + 1;

              const left = (offset / totalDays) * 100;
              const width = (duration / totalDays) * 100;

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute top-0 h-16"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                      }}
                    >
                      <Card className="h-full bg-primary text-primary-foreground overflow-hidden">
                        <CardHeader className="p-2">
                          <CardTitle className="text-sm truncate">
                            {item.name}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                    <p>
                      {item.start} a {item.end}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}
