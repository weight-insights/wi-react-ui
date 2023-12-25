import { FunctionComponent } from 'react';
import Button from '../components/Button';

const ButtonPage: FunctionComponent<{}> = () => {
  const handleClick = () => {
    console.log('button clicked');
  }

  return (
    <div>
      <Button onClick={handleClick} primary rounded />
      <Button onClick={handleClick} primary />
      <Button onClick={handleClick} primary outline />
      <Button onClick={handleClick} secondary />
      <Button onClick={handleClick} success />
      <Button onClick={handleClick} warning />
      <Button onClick={handleClick} danger />
    </div>
  );
};

export default ButtonPage;