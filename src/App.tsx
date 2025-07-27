import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import { useFetchUser } from '@/hooks/useFetchUser';
import Puzzles from '@/pages/Puzzles';
import { Loader } from 'lucide-react';
import Layout from '@/Layout';
import Publish from '@/pages/Publish';
import { Toaster } from 'sonner';

const App = () => {
  const { isLoading } = useFetchUser();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={64} />
      </div>
    );
  }
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/puzzles" element={<Puzzles />} />
            <Route path="/ajouter-un-puzzle" element={<Publish />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
