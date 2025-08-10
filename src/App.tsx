import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home';
import { useFetchUser } from '@/hooks/useFetchUser';
import Puzzles from '@/pages/Puzzles';
import { Loader } from 'lucide-react';
import Layout from '@/Layout';
import Publish from '@/pages/Publish';
import { Toaster } from 'sonner';
import Profile from '@/pages/Profile';
import PublicProfilePage from '@/pages/PublicProfile';
import React, { useLayoutEffect } from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

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
      <Toaster
        position="top-right"
        richColors
        closeButton={true}
      />
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/puzzles" element={<Puzzles />} />
              <Route path="/ajouter-un-puzzle" element={<Publish />} />
              <Route path="/mon-espace" element={<Profile />} />
              <Route path="/profil/:username" element={<PublicProfilePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
};

export default App;
