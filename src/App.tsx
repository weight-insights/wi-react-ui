import WiSignin from './components/auth/WiSignin';
import AccordionPage from './pages/AccordionPage';
import ButtonPage from './pages/ButtonPage';
import DropdownPage from './pages/DropDownPage';

function App() {
  return (
    <>
      <header>
        Weight Insights
      </header>
      <AccordionPage />
      <DropdownPage />
      <ButtonPage />
      <WiSignin />
    </>
  );
}

export default App;
