import { useState } from "react";
import { Timeline } from "@/components/Timeline";
import {
  timelineItems as initialItems,
  type ItemData,
} from "@/data/timelineItems";

function App() {
  const [items, setItems] = useState<ItemData[]>(initialItems);

  const handleUpdateItem = (id: number, newName: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Airtable Timeline</h1>
        <p className="text-muted-foreground">
          Viewing events in a compact way. Double-click an item to edit.
        </p>
      </header>
      <div className="border rounded-lg overflow-x-auto">
        <Timeline items={items} onUpdateItem={handleUpdateItem} />
      </div>
    </main>
  );
}

export default App;
