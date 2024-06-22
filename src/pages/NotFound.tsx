import WiButton from '../components/WiButton';

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <WiButton variant='outlined'>OK</WiButton>
      <WiButton />
      <WiButton>Hi</WiButton>
      <WiButton variant='text' />
    </>
  );
}
