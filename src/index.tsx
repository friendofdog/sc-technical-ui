import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

type AppProps = {
  items: Item[];
};

const ListItem = React.memo(({ item, isSelected, toggleSelect }: {
  item: Item;
  isSelected: boolean;
  toggleSelect: (name: string) => void;
}) => {
  return (
    <li
      className={`List-item ${isSelected ? "selected" : ''}`}
      style={{ backgroundColor: isSelected ? item.color: 'darksalmon' }}
      onClick={() => toggleSelect(item.name)}
    >
      {item.name}
    </li>
  );
});

function App({ items }: AppProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelect = useCallback((itemName: string) => {
    setSelectedItems((prev) => {
      const curr = new Set(prev); // prevent mutation

      if (curr.has(itemName)) {
        curr.delete(itemName);
      } else {
        curr.add(itemName);
      }

      return curr;
    });
  }, []);

  return (
    <>
      <div className="Selected-items">
        Selected: {Array.from(selectedItems).join(", ")}
      </div>
      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            isSelected={selectedItems.has(item.name)}
            toggleSelect={toggleSelect}
          />
        ))}
      </ul>
    </>
  );
}

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

type Item = {
  name: string;
  color: string;
};

const sizes = ["tiny", "small", "medium", "large", "huge"];
const colors = [
  "navy",
  "blue",
  "aqua",
  "teal",
  "olive",
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "maroon",
  "fuchsia",
  "purple",
  "silver",
  "gray",
  "black",
];
const fruits = [
  "apple",
  "banana",
  "watermelon",
  "orange",
  "peach",
  "tangerine",
  "pear",
  "kiwi",
  "mango",
  "pineapple",
];

const items = sizes.flatMap((size) =>
  fruits.flatMap((fruit) =>
    colors.flatMap((color) => [
      {
        name: `${size} ${color} ${fruit}`,
        color,
      },
    ])
  )
);

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App items={items} />
  </React.StrictMode>
);
