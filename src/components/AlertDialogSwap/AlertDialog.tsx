import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import clsx from 'clsx';

interface AlertDialogSwapProps {
  action: 'accepted' | 'denied';
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

const AlertDialogSwap = ({
  action,
  open,
  setOpen,
  onConfirm,
}: AlertDialogSwapProps) => {
  const isTerminated = action === 'accepted';

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={clsx(
              'text-lg font-semibold',
              isTerminated ? 'text-green-500' : 'text-red-500'
            )}
          >
            {isTerminated ? "Terminer l'échange" : "Refuser l'échange"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isTerminated
              ? 'En cliquant sur « Terminé », tu confirmes que l’échange s’est bien déroulé. Ton puzzle sera retiré de ta liste et la discussion sera close.'
              : 'Souhaites-tu vraiment refuser cet échange ? La discussion sera close et tu ne pourras envoyer de message.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className={clsx(
              'text-white',
              isTerminated
                ? 'bg-green-500 hover:bg-emerald-500'
                : 'bg-red-500 hover:bg-red-600'
            )}
            onClick={onConfirm}
          >
            {isTerminated ? 'Terminer' : 'Refuser'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogSwap;
