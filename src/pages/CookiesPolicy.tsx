import Header from '@/components/Header';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Politique de cookies"
        subtitle="Cette politique explique comment Ruzzle utilise les
            cookies pour assurer le bon fonctionnement de la plateforme et
            améliorer votre expérience utilisateur."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="space-y-6 text-gray-700">
          <h2 className="text-xl font-semibold">1. Qu’est-ce qu’un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte enregistré sur votre appareil
            lorsque vous visitez un site web. Il permet au site de reconnaître
            votre appareil et de mémoriser certaines informations.
          </p>

          <h2 className="text-xl font-semibold">
            2. Cookies utilisés sur Ruzzle
          </h2>
          <p>
            Nous utilisons uniquement des cookies essentiels :
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Cookie de session (HTTP-Only)</strong> : il est
                nécessaire pour maintenir votre connexion sécurisée et permettre
                le bon fonctionnement de la plateforme.
              </li>
            </ul>
            Nous n’utilisons aucun cookie publicitaire ni de suivi tiers.
          </p>

          <h2 className="text-xl font-semibold">3. Gestion des cookies</h2>
          <p>
            Comme nos cookies sont strictement nécessaires, ils ne peuvent pas
            être désactivés via l’interface du site. Vous pouvez toutefois
            configurer votre navigateur pour bloquer tous les cookies, mais
            certaines fonctionnalités risquent alors de ne plus fonctionner
            correctement.
          </p>

          <h2 className="text-xl font-semibold">
            4. Modifications de la politique de cookies
          </h2>
          <p className="mb-20">
            <strong>Ruzzle</strong> se réserve le droit de modifier cette
            politique à tout moment. Toute modification importante sera
            communiquée via notification sur le site ou par email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
