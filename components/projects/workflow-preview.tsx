import { CheckCircle2 } from 'lucide-react';

interface WorkflowStep {
  role: string;
  completed: boolean;
}

interface WorkflowPreviewProps {
  steps: WorkflowStep[];
}

export function WorkflowPreview({ steps }: WorkflowPreviewProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Circle indicator */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 ${
              step.completed
                ? 'bg-success border-success text-white'
                : 'bg-primary/20 border-primary text-primary'
            }`}
          >
            {step.completed ? <CheckCircle2 size={16} /> : index + 1}
          </div>

          {/* Role label */}
          <span className="text-sm font-medium text-foreground whitespace-nowrap">
            {step.role}
          </span>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-4 h-0.5 mx-2 ${step.completed ? 'bg-success' : 'bg-border'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
