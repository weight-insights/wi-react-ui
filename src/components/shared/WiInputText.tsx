import { useState } from 'react';

interface WiInputTextProps {
  label?: string;
  initialText?: string;
  onChange: ((...args: any) => void); 
  placeholder?: string;
  type?: string;
}

function WiInputText({
  label,
  initialText = '',
  onChange = () => {},
  placeholder,
  type = 'text'
}: WiInputTextProps) {
  const [text, setText] = useState<string>(initialText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
    onChange(text);
  };

  const inputLabel = label ? <label>{label}</label> : null;
  return (
    <div>
      {inputLabel}
      <input value={text} onChange={handleChange} placeholder={placeholder} type={type} />
    </div>
  );
}

export default WiInputText;
