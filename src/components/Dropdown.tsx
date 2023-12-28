import { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

type Option = {
  value: string | number;
  label: string;
}

type DropdownProps = {
  options: Option[];
  value?: Option;
  onChange: ((...args: any) => void);
}

function Dropdown({
  options,
  value,
  onChange
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: { target: any; }) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler, true);

    const cleanUp = () => {
      document.removeEventListener('click', handler);
    };

    return cleanUp;
  }, []);

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div className="hover:bg-sky-100 rounded cursor-pointer p-1" onClick={() => handleOptionClick(option)} key={option.value}>
        {option.label}
      </div>
    );
  });

  return (
  <div ref={divEl} className="w-48 relative">
    <Panel className="flex justify-between items-center cursor-pointer"
      onClick={handleClick}>
      {value?.label || 'Select...'}
      <GoChevronDown className="text-lg" />
    </Panel>
    {isOpen && (
      <Panel className="absolute top-full">
        {renderedOptions}
      </Panel>
    )}
  </div>
  );
}

export default Dropdown;
