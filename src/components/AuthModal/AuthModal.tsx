import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Form from '@/components/AuthModal/Form';
import { useAuthModalStore } from '@/stores/useAuthModalStore';

const AuthModal = () => {
  const { isOpen, activeTab, close, switchTab } = useAuthModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px] bg-white/90 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold text-gray-900 gradient-text">
            {activeTab === 'login'
              ? 'Bon retour parmi nous !'
              : 'Rejoignez la communauté des puzzles'}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          className="w-full"
          onValueChange={(tab) => switchTab(tab as 'login' | 'signup')}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="text-base">
              Connexion
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-base">
              Inscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Form close={close}/>
          </TabsContent>

          <TabsContent value="signup">
            <Form />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
