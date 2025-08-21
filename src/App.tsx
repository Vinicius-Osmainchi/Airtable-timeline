import { Timeline } from "@/components/Timeline";
import timelineItems from "./data/timelineItems";

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Airtable Timeline</h1>
        <p className="text-muted-foreground">
          Viewing events in a compact way.
        </p>
      </header>
      <div className="border rounded-lg overflow-x-auto">
        <Timeline items={timelineItems} />
      </div>
    </main>
  );
}

export default App;
