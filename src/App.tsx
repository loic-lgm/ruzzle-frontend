import { Button } from "@/components/ui/button"
import Navbar from '@/components/Navbar';

function App() {
  return (
    <>
      <div>
        <Navbar />
          <Button className="cursor-pointer">Click</Button>
      </div>
    </>
  );
}

export default App;
