import { type ItemData } from "@/data/timelineItems";

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
export function assignLanes(items: ItemData[]): ItemData[][] {
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const lanes: ItemData[][] = [];

  for (const item of sortedItems) {
    let placed = false;
    for (const lane of lanes) {
      const lastItemInLane = lane[lane.length - 1];
      if (new Date(item.start) > new Date(lastItemInLane.end)) {
        lane.push(item);
        placed = true;
        break;
      }
    }

    if (!placed) {
      lanes.push([item]);
    }
  }

  return lanes;
}
