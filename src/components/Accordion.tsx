import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

type Item = {
  id: string;
  label: string;
  content: string;
}

type AccordionProps = {
  items: Item[];
}

function Accordion({ items }: AccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleClick = (index: number) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === index) return -1;
      return index;
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    const icon = (
      <div className="text-2xl">
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
      </div>
    );
    return (
      <div key={item.id}>
        <div onClick={() => handleClick(index)} className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer">
          {item.label}
          {icon}
        </div>
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });
  return (
    <div className="border-x border-t rounded">{renderedItems}</div>
  );
}

export default Accordion;
