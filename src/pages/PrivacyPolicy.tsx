import Header from '@/components/Header';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Politique de confidentialité"
        subtitle="Chez Ruzzle, nous accordons une grande importance
              à la protection de vos données personnelles. Cette politique
              explique quelles informations nous collectons, comment nous les
              utilisons et quels sont vos droits."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="space-y-6 text-gray-700">
          <h2 className="text-xl font-semibold">1. Données collectées</h2>
          <p>
            Lors de votre inscription et utilisation de la plateforme, nous
            collectons : l&apos;email, le nom, le prénom, le nom
            d&apos;utilisateur, la ville et les données techniques (adresse IP,
            navigateur, cookies de session).
          </p>

          <h2 className="text-xl font-semibold">2. Utilisation des données</h2>
          <p>
            Nous utilisons vos données pour créer et gérer votre compte, assurer
            la sécurité de la plateforme, et vous contacter si nécessaire. Le
            nom d&apos;utilisateur et la ville peuvent être visibles par les
            autres utilisateurs, mais les autres données restent
            confidentielles.
          </p>

          <h2 className="text-xl font-semibold">3. Partage des données</h2>
          <p>
            Vos données ne sont jamais vendues ni louées. Elles peuvent être
            communiquées uniquement aux prestataires techniques nécessaires au
            fonctionnement du site ou si la loi l&apos;exige.
          </p>

          <h2 className="text-xl font-semibold">4. Conservation des données</h2>
          <p>
            Vos données sont conservées tant que votre compte est actif. Vous
            pouvez demander leur suppression à tout moment.
          </p>

          <h2 className="text-xl font-semibold">5. Vos droits</h2>
          <p className="mb-20">
            Conformément au RGPD, vous disposez des droits d&apos;accès, de
            rectification, d&apos;effacement, d&apos;opposition et de
            portabilité de vos données. Pour exercer vos droits, contactez-nous
            à : <strong>contact@ruzzle.fr</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
