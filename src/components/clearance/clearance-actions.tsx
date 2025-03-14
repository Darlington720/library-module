import { useState } from 'react';
import { ClearanceRequest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ClearanceActionsProps {
  clearanceRequest: ClearanceRequest;
  onStatusUpdate: (status: ClearanceRequest['status'], reason?: string) => void;
  onOverride: (reason: string) => void;
}

export function ClearanceActions({
  clearanceRequest,
  onStatusUpdate,
  onOverride,
}: ClearanceActionsProps) {
  const { toast } = useToast();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isOverrideDialogOpen, setIsOverrideDialogOpen] = useState(false);
  const [reason, setReason] = useState('');

  const handleApprove = () => {
    if (clearanceRequest.hasPendingBooks || clearanceRequest.hasUnpaidFines) {
      toast({
        title: 'Cannot Approve',
        description: 'Student has pending books or unpaid fines.',
        variant: 'destructive',
      });
      return;
    }

    onStatusUpdate('approved');
    toast({
      title: 'Clearance Approved',
      description: 'The student has been cleared for graduation.',
    });
  };

  const handleReject = () => {
    if (!reason) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for rejection.',
        variant: 'destructive',
      });
      return;
    }

    onStatusUpdate('rejected', reason);
    setIsRejectDialogOpen(false);
    setReason('');
    toast({
      title: 'Clearance Rejected',
      description: 'The student has been notified of the rejection.',
    });
  };

  const handleOverride = () => {
    if (!reason) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for the override.',
        variant: 'destructive',
      });
      return;
    }

    onOverride(reason);
    setIsOverrideDialogOpen(false);
    setReason('');
    toast({
      title: 'Override Applied',
      description: 'Manual override has been applied to the clearance.',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end space-x-2">
        {clearanceRequest.status === 'pending' && (
          <>
            <Button
              variant="destructive"
              onClick={() => setIsRejectDialogOpen(true)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOverrideDialogOpen(true)}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Override
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </>
        )}
      </div>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Clearance</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this clearance request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Override Dialog */}
      <Dialog open={isOverrideDialogOpen} onOpenChange={setIsOverrideDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Override</DialogTitle>
            <DialogDescription>
              Apply a manual override to approve this clearance despite outstanding issues.
              This action will be logged and requires justification.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Enter override reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOverrideDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleOverride}>
              Apply Override
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}