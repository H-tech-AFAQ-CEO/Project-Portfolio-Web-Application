import { CheckCircle2 } from 'lucide-react';
import { StatusBadge } from './status-badge';

interface WorkflowStep {
  role: string;
  status: 'approved' | 'submitted' | 'pending' | 'rejected';
  date?: string;
  person?: string;
}

interface WorkflowDetailProps {
  steps: WorkflowStep[];
}

export function WorkflowDetail({ steps }: WorkflowDetailProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          {/* Timeline indicator */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.status === 'approved'
                  ? 'bg-success border-success text-white'
                  : step.status === 'submitted'
                    ? 'bg-primary border-primary text-white'
                    : 'bg-muted border-border'
              }`}
            >
              {step.status === 'approved' && <CheckCircle2 size={18} />}
              {step.status !== 'approved' && (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-12 ${
                  step.status === 'approved' ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>

          {/* Step content */}
          <div className="pb-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{step.role}</h3>
                {step.date && <p className="text-sm text-muted-foreground mt-1">{step.date}</p>}
                {step.person && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <span className="text-base">👤</span> {step.person}
                  </p>
                )}
              </div>
              <StatusBadge status={step.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
