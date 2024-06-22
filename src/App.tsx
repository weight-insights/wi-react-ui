import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';

// expamples of routers:
// https://github.com/remix-run/react-router/tree/dev/examples
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<NotFound />} />
            <Route path='/accordion' element={<NotFound />} />
            <Route path='/button' element={<NotFound />} />
          </Route>
          <Route path='/signin' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
