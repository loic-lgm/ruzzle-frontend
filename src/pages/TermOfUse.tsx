import Header from '@/components/Header';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Conditions d'utilisation"
        subtitle="Bienvenue sur Ruzzle, une plateforme de mise en
              relation entre particuliers pour échanger des puzzles lors de
              rencontres en personne (“meet-ups”)."
      />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="space-y-6 text-gray-700">
            <h2 className="text-xl font-semibold">1. Objet</h2>
            <p>
              Ces conditions définissent les modalités d&apos;utilisation de la
              plateforme. En l&apos;utilisant, vous acceptez ces conditions.
            </p>

            <h2 className="text-xl font-semibold">
              2. Inscription et compte utilisateur
            </h2>
            <p>
              Pour accéder à certaines fonctionnalités, vous devez créer un
              compte avec des informations exactes. Le nom d&apos;utilisateur et
              la ville seront visibles par les autres membres, mais vos
              informations personnelles (email, prénom, nom) restent
              confidentielles.
            </p>

            <h2 className="text-xl font-semibold">
              3. Fonctionnement de la plateforme
            </h2>
            <p>
              La plateforme permet de publier des annonces pour échanger des
              puzzles et organiser des rencontres. Ruzzle agit uniquement comme
              intermédiaire technique et n’est pas responsable de la qualité des
              échanges.
            </p>

            <h2 className="text-xl font-semibold">
              4. Responsabilités de l&apos;utilisateur
            </h2>
            <p>
              Vous vous engagez à utiliser la plateforme légalement et
              respectueusement, sans publier de contenu illicite ou nuisible et
              en respectant les autres utilisateurs lors des rencontres.
            </p>

            <h2 className="text-xl font-semibold">
              5. Responsabilités de la plateforme
            </h2>
            <p>
              Ruzzle met tout en œuvre pour assurer un service sécurisé mais ne
              peut garantir l&apos;absence d&apos;interruptions ou
              d&apos;erreurs. La plateforme n&apos;est pas responsable des
              dommages liés à l&apos;utilisation du service.
            </p>

            <h2 className="text-xl font-semibold">6. Résiliation</h2>
            <p>
              Vous pouvez supprimer votre compte à tout moment. Ruzzle peut
              suspendre ou supprimer tout compte ne respectant pas ces
              conditions.
            </p>

            <h2 className="text-xl font-semibold">7. Modifications</h2>
            <p className="mb-20">
              Ruzzle se réserve le droit de modifier ces conditions. Vous serez
              informé des changements importants via email ou notification sur
              le site.
            </p>
          </div>
        </div>
    </div>
  );
};

export default TermsOfUse;
