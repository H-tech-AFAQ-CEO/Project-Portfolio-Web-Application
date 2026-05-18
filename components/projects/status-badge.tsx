interface StatusBadgeProps {
  status: 'approved' | 'submitted' | 'pending' | 'rejected';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = {
    approved: 'bg-success/10 text-success',
    submitted: 'bg-primary/10 text-primary',
    pending: 'bg-amber-100 text-amber-800',
    rejected: 'bg-destructive/10 text-destructive',
  };

  const defaultLabels = {
    approved: 'Approved',
    submitted: 'Submitted',
    pending: 'Pending',
    rejected: 'Rejected',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${colors[status]}`}>
      {label || defaultLabels[status]}
    </span>
  );
}
