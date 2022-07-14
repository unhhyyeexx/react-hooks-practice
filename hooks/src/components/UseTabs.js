import { useState } from "react";

const content = [
  {
    tab: "Section1",
    content: "I am the content of the Section 1",
  },
  {
    tab: "Section2",
    content: "I am the content of the Section 2",
  }
]

const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex]
  }
}

function UseTabs() {

  const {currentItem} = useTabs(0, content);
  return (
    <div>
      <h1>useTabs</h1>
      {content.map(section => (
        <button>{section.tab}</button>
      ))}
      <div>
        {currentItem.content}
      </div>
    </div>
  )
}

export default UseTabs;