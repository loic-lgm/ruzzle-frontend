import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload } from 'lucide-react';

const Publish = () => {
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

            <form className="space-y-6">
              <div className="flex justify-between gap-6">
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger className="border-emerald-500 focus:border-green-500">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select>
                    <SelectTrigger className="border-emerald-500 focus:border-green-500">
                      <SelectValue placeholder="Nombre de pièces" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={'count'} value={'count'}></SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select>
                    <SelectTrigger className="border-emerald-500 focus:border-green-500">
                      <SelectValue placeholder="Marque" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select>
                    <SelectTrigger className="border-emerald-500 focus:border-green-500">
                      <SelectValue placeholder="État" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Neuf (jamais utilisé)</SelectItem>
                      <SelectItem value="like-new">Comme neuf</SelectItem>
                      <SelectItem value="good">Bon</SelectItem>
                      <SelectItem value="fair">Passable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="border-2 border-dashed border-emerald-500 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-emerald-500" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Glisser et déposez vos images de puzzle ici, ou cliquez
                      pour sélectionner les fichiers
                    </p>
                    <p className="text-xs text-gray-500">
                      Télécharger jusqu&apos;à 5 images (PNG, JPG, JPEG • 5MB
                      max par image)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all"
                >
                  Publish Puzzle
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              En publiant un puzzle, vous acceptez les{' '}
              <a href="#" className="text-green-500">
                Conditions d&apos;utilisation{' '}
              </a>{' '}
              et les{' '}
              <a href="#" className="text-green-500">
                Règles Communautaires{' '}
              </a>{' '}
              de Ruzzle.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Publish;
