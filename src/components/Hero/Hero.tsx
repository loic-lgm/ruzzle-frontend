import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <section className="flex items-center h-screen pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full filter blur-3xl"></div>

        <div className="z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-full font-medium mb-4 animate-fade-in">
            Rejoignez la communauté!
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-lime-500 via-green-500 to-teal-500 bg-clip-text text-transparent animate-slide-up">
            Trouvez la pièce manquante
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 animate-slide-up-delay-1">
            La première marketplace pour les amateurs de puzzles afin
            d&apos;échanger des puzzles et d&apos;entrer en contact avec une
            communauté florissante.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Link
              to="/puzzles"
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-xl font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all hover:-translate-y-1"
            >
              Parcourir les puzzles
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#how-it-works"
              className="bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-green-500"
            >
              Comment ça marche
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
