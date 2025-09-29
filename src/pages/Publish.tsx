import { Loader } from 'lucide-react';
import PublishForm from '@/components/PublishForm';
import useUserStore from '@/stores/useUserStore';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { Link } from 'react-router';

const Publish = () => {
  const { user } = useUserStore();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent mb-2">
                Partager votre puzzle
              </h1>
              <p className="text-gray-600">
                Publiez votre puzzle sur Ruzzle et entrez en contact avec
                d&apos;autres passionnés du puzzle
              </p>
            </div>
            {!categories || !brands ? (
              <div className="text-center flex items-center justify-center">
                <Loader className="animate-spin" size={32} />
              </div>
            ) : (
              <PublishForm
                categories={categories}
                brands={brands}
                user={user}
              />
            )}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              En publiant un puzzle, vous acceptez les{' '}
              <Link to="/conditions" className="text-green-500">
                Conditions d&apos;utilisation{' '}
              </Link>{' '}
              de Ruzzle.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Publish;
