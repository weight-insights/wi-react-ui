import { useState } from 'react';
import Dropdown from '../components/Dropdown';

type Color = {
  value: string;
  label: string;
}

function DropdownPage() {
  const [color, setColor] = useState<Color>();

  const options = [
    {
      value: 'red',
      label: 'Red'
    },
    {
      value: 'blue',
      label: 'Blue'
    },
    {
      value: 'green',
      label: 'Green'
    }
  ];

  const handleChange = (option: Color) => {
    setColor(option);
  };

  return (
    <div>
      <Dropdown onChange={handleChange} options={options} value={color} />
    </div>
  );
}

export default DropdownPage;
