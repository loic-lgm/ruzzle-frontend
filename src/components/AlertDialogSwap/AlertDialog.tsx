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
  const isAccept = action === 'accepted';

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={clsx(
              'text-lg font-semibold',
              isAccept ? 'text-green-500' : 'text-red-500'
            )}
          >
            {isAccept ? "Terminer l'échange" : "Refuser l'échange"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Es tu sûr de vouloir {isAccept ? 'terminer' : 'refuser'} cet
            échange ? Cette action est définitive.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className={clsx(
              'text-white',
              isAccept
                ? 'bg-green-500 hover:bg-emerald-500'
                : 'bg-red-500 hover:bg-red-600'
            )}
            onClick={onConfirm}
          >
            {isAccept ? 'Terminer' : 'Refuser'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogSwap;
