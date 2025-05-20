import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import useUserStore from '@/stores/useUserStore';

const App = () => {
  useUserStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
