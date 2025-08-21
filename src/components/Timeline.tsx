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
import { TimelineHeader } from "./TimelineHeader";

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
  const { lanes, startDate, totalDays, months } = useMemo(() => {
    if (items.length === 0) {
      return { lanes: [], startDate: new Date(), totalDays: 0, months: [] };
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

    const monthMap = new Map<string, number>();
    const current = new Date(minDate);
    for (let i = 0; i < days; i++) {
      const monthKey = `${current.getFullYear()}-${current.getMonth()}`;
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
      current.setDate(current.getDate() + 1);
    }

    const monthList = Array.from(monthMap.entries()).map(([key, dayCount]) => {
      const [year, monthIndex] = key.split("-");
      const date = new Date(parseInt(year), parseInt(monthIndex));
      const monthName = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      const width = (dayCount / days) * 100;
      return { name: monthName, width, dayCount };
    });

    return {
      lanes: assignedLanes,
      startDate: minDate,
      totalDays: days,
      months: monthList,
    };
  }, [items]);

  if (items.length === 0) {
    return <div>Nenhum item para exibir.</div>;
  }

  let accumulatedLeft = 0;

  return (
    <div className="relative p-4">
      <TimelineHeader
        startDate={startDate}
        totalDays={totalDays}
        months={months}
      />

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full grid z-0">
          {months.map((month, index) => {
            accumulatedLeft += month.width;

            if (index === months.length - 1) return null;

            return (
              <div
                key={`grid-${index}`}
                className="absolute top-0 bottom-0 w-px bg-border"
                style={{ left: `${accumulatedLeft}%` }}
              />
            );
          })}
        </div>

        <TooltipProvider>
          {lanes.map((lane, laneIndex) => (
            <div key={laneIndex} className="relative h-20 mb-2 z-10">
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
                        <Card className="h-full bg-primary text-primary-foreground overflow-hidden hover:opacity-80 transition-opacity">
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
    </div>
  );
}
