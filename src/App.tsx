import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import { useFetchUser } from '@/hooks/useFetchUser';
import Puzzles from '@/pages/Puzzles';

const App = () => {
  useFetchUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puzzles" element={<Puzzles />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
