import { Route, Routes } from 'react-router-dom';
import AccordionPage from './pages/AccordionPage';
import ButtonPage from './pages/ButtonPage';
import DropdownPage from './pages/DropDownPage';
import NotFound from './pages/NotFound';
import TempSignin from './pages/TempSignin';
import Layout from './pages/Layout';

// expamples of routers:
// https://github.com/remix-run/react-router/tree/dev/examples
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<DropdownPage />} />
          <Route path='/accordion' element={<AccordionPage />} />
          <Route path='/button' element={<ButtonPage />} />
        </Route>
        <Route path='/signin' element={<TempSignin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
