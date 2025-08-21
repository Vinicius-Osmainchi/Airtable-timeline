import { useMemo } from "react";
interface MonthInfo {
  name: string;
  width: number;
  dayCount: number;
}

interface TimelineHeaderProps {
  startDate: Date;
  totalDays: number;
  months: MonthInfo[];
}

const DAY_VIEW_THRESHOLD = 90;

export function TimelineHeader({ startDate, totalDays }: TimelineHeaderProps) {
  const showDays = totalDays <= DAY_VIEW_THRESHOLD;

  const months = useMemo(() => {
    const monthMap = new Map<string, number>();
    const current = new Date(startDate);

    for (let i = 0; i < totalDays; i++) {
      const monthKey = `${current.getFullYear()}-${current.getMonth()}`;
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
      current.setDate(current.getDate() + 1);
    }

    return Array.from(monthMap.entries()).map(([key, dayCount]) => {
      const [year, monthIndex] = key.split("-");
      const date = new Date(parseInt(year), parseInt(monthIndex));
      const monthName = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      const width = (dayCount / totalDays) * 100;

      return {
        name: monthName,
        width: width,
        dayCount: dayCount,
      };
    });
  }, [startDate, totalDays]);

  return (
    <div className="sticky top-0 z-20 bg-background mb-2">
      <div className="flex border-b border-l">
        {months.map((month, index) => (
          <div
            key={index}
            className="flex-shrink-0 border-r p-2 text-sm font-semibold text-center"
            style={{ flexBasis: `${month.width}%` }}
          >
            {month.name}
          </div>
        ))}
      </div>

      {showDays && (
        <div className="flex border-b border-l">
          {months.map((month, monthIndex) => {
            const firstDayOfMonth = new Date(startDate);
            if (monthIndex > 0) {
              const prevMonthDays = months
                .slice(0, monthIndex)
                .reduce((acc, m) => acc + m.dayCount, 0);
              firstDayOfMonth.setDate(startDate.getDate() + prevMonthDays);
            }

            return (
              <div
                key={month.name}
                className="flex flex-shrink-0"
                style={{ flexBasis: `${month.width}%` }}
              >
                {Array.from({ length: month.dayCount }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="flex-auto border-r text-xs text-muted-foreground text-center"
                  >
                    {firstDayOfMonth.getDate() + dayIndex}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
