export interface TimelineItem {
  id: number;
  start: string; 
  end: string;
  name: string;
}

export const timelineItems: TimelineItem[] = [
  {
    id: 1,
    start: "2021-01-14",
    end: "2021-01-22",
    name: "Recruit translators",
  },
  {
    id: 2,
    start: "2021-01-17",
    end: "2021-01-31",
    name: "Create lesson plan 1",
  },

  {
    id: 16,
    start: "2021-05-01",
    end: "2021-05-01",
    name: "Launch day",
  },
];
