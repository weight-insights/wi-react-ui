import { useEffect, useState } from 'react';
import WiInputText from '../shared/WiInputText';
import WiButton from '../shared/WiButton';

function WiSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, []);

  const handleEmailChange = (text: string) => {
    console.log(text);
    setEmail(text);
    console.log(email);
  };

  const handlePasswordChange = (text: string) => {
    console.log('text', text);
    setPassword(text);
    console.log('password', password);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('handleSubmit triggered');
  };

  // const handleClick = () => {
  //   console.log('handleClick triggered');
  // };

  return (
    <div>
      Sign In
      <form onSubmit={handleSubmit}>
        <WiInputText onChange={handleEmailChange} label='Email' placeholder='email' type='email' />
        <WiInputText onChange={handlePasswordChange} label='Password' placeholder='password' type='password' />
        <WiButton>Submit</WiButton>
      </form>
    </div>
  );
}

export default WiSignin;
