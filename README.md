# Airtable Timeline Assignment

This project implements an interactive timeline component for visualizing events in a compact and efficient manner. It's built with a modern stack featuring Vite, React, TypeScript, Tailwind CSS, and Shadcn/UI.

✨ Features

* **Compact Lane Layout:** Automatically arranges items in space-efficient horizontal lanes.
* **Dynamic Time Scale Header:** A sticky header displays a scale of months and days, providing clear temporal context.
* **Visual Grid System:** Vertical and horizontal lines create a subtle grid, making it easy to align items with their respective dates and lanes.
* **Inline Item Editing:** Simply **double-click** on any item's name to edit it directly on the timeline. Press **Enter** or click away to save.
* **Responsive Layout:** The percentage-based rendering ensures the timeline adapts smoothly to different container sizes.
* **Informative Tooltips:** Hover over any item to see its full name and date range.

---

## 🚀 How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vinicius-Osmainchi/Airtable-timeline.git
    cd airtable-timeline
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The project will be available at `http://localhost:5173` (or another port indicated by Vite).

---

## 🏗️ Design Decisions

-   **Tech Stack (Vite, TS, Tailwind, Shadcn/UI):** I chose this stack for its modernity, performance, and excellent developer experience.
    -   **Vite** offers an extremely fast development setup.
    -   **TypeScript** ensures type safety, making the code more robust and easier to maintain.
    -   **Tailwind CSS** allows for building complex interfaces in a utility-first way without leaving JSX.
    -   **Shadcn/UI** provides high-quality, accessible, and customizable components that accelerate UI development.

-   **State Management for Interactivity:** To enable features like inline editing, the main data array was "lifted up" into a React state managed by the top-level `App` component. This allows modifications to be passed down through props, triggering re-renders with the updated data.

-   **Component Architecture:** The application is broken down into logical components (`Timeline`, `TimelineHeader`, `TimelineItem`). This improves code organization, encapsulates state and logic (like the editing state within `TimelineItem`), and makes the codebase easier to maintain and scale.

-   **Percentage-Based Layout:** The positions (`left`) and widths (`width`) of the items are calculated as a percentage of the total project duration. This makes the timeline inherently responsive.

-   **User Experience (UX):**
    -   The time scale header is **sticky** so it remains visible when scrolling vertically through many lanes.
    -   **Inline editing** is initiated via an intuitive **double-click** action.
    -   A subtle **grid system** of horizontal and vertical lines was added to guide the user's eye without cluttering the interface.
    -   A `Tooltip` displays full details on hover, keeping the main view clean.

---

## 👍 What I Like About My Implementation

-   **Clean, Typed Code:** The use of TypeScript and the separation of concerns make the code readable and easy to maintain.
-   **Modularity and Reusability:** By creating separate `TimelineHeader` and `TimelineItem` components, the main `Timeline` component remains clean and focused on layout, while the other components can be managed or even reused independently.
-   **Performance:** Using `useMemo` for heavy calculations (like date ranges and month layouts) ensures they only run when the input data changes, preventing unnecessary re-renders.
-   **Enhanced Interactivity:** The final component is not just a static visualization; the inline editing feature makes it a more dynamic and useful tool.

---

## 📝 What I Would Change or Do Next

If I had more time, I would implement the following enhancements:

1.  **Zoom Functionality:** I would implement a zoom feature to view the timeline at different granularities (days, weeks, months). This would involve managing the "viewport" state and recalculating positions accordingly.
2.  **Drag and Drop:** I would use a library like `dnd-kit` to allow users to drag items to change their start/end dates. This would require converting pixel offsets into day differences.
3.  **Virtualization:** For timelines with hundreds or thousands of items, I would use a library like `react-virtual` to render only the items and lanes currently visible on the screen, drastically improving performance.

---

## 🧪 How I Would Test This Component

-   **Unit Tests (Vitest):**
    -   The `assignLanes` and `dateDiffInDays` functions are pure and ideal for unit testing with various scenarios and edge cases.

-   **Component Tests (React Testing Library):**
    -   I would render the `Timeline` component with mock data and verify that the correct number of items, lanes, and header elements are rendered.
    -   I would simulate a `mouseOver` event on an item and check if the `Tooltip` appears with the correct information.
    -   **For the editing feature:** I would simulate a `doubleClick` event on an item and assert that an `<input>` element appears. Then, I would simulate typing and firing a `blur` or `Enter` keydown event to ensure the `onUpdateItem` callback is fired with the correct new data.
    -   I would run accessibility tests to ensure that all elements are correctly identified by screen readers.
