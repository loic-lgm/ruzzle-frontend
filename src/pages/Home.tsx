import Discover from '@/components/Discover';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stepper />
      <Discover />
    </>
  );
};

export default Home;
