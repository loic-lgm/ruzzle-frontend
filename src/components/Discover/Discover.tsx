import PuzzleCard from '@/components/PuzzleCard';
import { Puzzle } from '@/types/puzzle';
import { ArrowRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';

const categories = [
  'Tous les puzzles',
  'Puzzle classique',
  'Puzzles 3D',
  'Puzzles en bois',
  'Mots croisés',
  'Casse-têtes',
  'Puzzles mystères',
];

const frenchCities = [
  'Paris',
  'Marseille',
  'Lyon',
  'Toulouse',
  'Nice',
  'Nantes',
  'Montpellier',
  'Strasbourg',
  'Bordeaux',
  'Lille',
  'Rennes',
  'Reims',
  'Le Havre',
  'Saint-Étienne',
  'Toulon',
  'Le Mans',
  'Aix-en-Provence',
  'Dijon',
  'Angers',
  'Nîmes',
];

const getRandomCity = () => {
  const randomIndex = Math.floor(Math.random() * frenchCities.length);
  return frenchCities[randomIndex];
};

const mockPuzzles: Puzzle[] = [
  {
    id: 'l1',
    title: 'Mountain Sunset',
    image:
      'https://www.mackoviahracky.sk/image/handle/image_bank/19057-a-educa-puzzle.jpg',
    pieceCount: 1000,
    category: 'Landscapes',
    brand: 'Ravensburger',
    city: getRandomCity(),
  },
  {
    id: 'l2',
    title: 'Ocean Waves',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    pieceCount: 500,
    category: 'Landscapes',
    brand: 'Clementoni',
    city: getRandomCity(),
  },
  {
    id: 'c1',
    title: 'Fantasy Adventure',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    pieceCount: 500,
    category: 'Cartoons',
    brand: 'Ravensburger',
    city: getRandomCity(),
  },
  {
    id: 'c4',
    title: 'City Life',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    pieceCount: 2000,
    category: 'Cartoons',
    brand: 'Heye',
    city: getRandomCity(),
  },
];

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const handleActiveCategory = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  return (
    <div className="flex flex-col items-center mt-50 mb-15">
      <p className="text-4xl mb-4 font-bold bg-gradient-to-r from-lime-500 via-teal-500 to-green-500 bg-clip-text text-transparent animate-slide-up">
        Découvrez les puzzles
      </p>
      <p className="text-lg mb-10">
        Parcourez notre vaste collection de puzzles de haute qualité prêts à
        être échangés.
      </p>
      <div className="flex flex-col items-center justify-center flex-wrap gap-3 mb-12">
        <div className="flex gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleActiveCategory(index)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-15 mb-15 px-8">
          {mockPuzzles.slice(0, 4).map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
          ))}
        </div>
        <Link
          to="/puzzles"
          className="group inline-flex items-center gap-2 text-green-500 font-medium text-lg hover:text-teal-500 transition-colors"
        >
          Voir tous les puzzles
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Discover;
