import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Action {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const mockActions: Action[] = [
  {
    id: '1',
    title: 'Submit Project Proposal',
    description: 'Finalize and submit the project proposal for review',
    completed: true,
  },
  {
    id: '2',
    title: 'Obtain Budget Approval',
    description: 'Get formal approval from finance department',
    completed: true,
  },
  {
    id: '3',
    title: 'Schedule Kickoff Meeting',
    description: 'Coordinate with team members for project kickoff',
    completed: false,
  },
];

export function ActionsSection() {
  return (
    <div className="card-elevated">
      <div className="border-b border-border p-6">
        <h3 className="text-lg font-semibold text-foreground">Actions</h3>
      </div>

      <div className="divide-y divide-border">
        {mockActions.map((action) => (
          <div key={action.id} className="p-6 flex gap-4 hover:bg-muted/30 transition-colors">
            {/* Checkbox or completion indicator */}
            {action.completed ? (
              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={18} className="text-white" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-border flex-shrink-0 mt-0.5" />
            )}

            {/* Action content */}
            <div className="flex-1">
              <h4 className={`font-medium ${action.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {action.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state alternative */}
      {mockActions.length === 0 && (
        <div className="p-12 text-center">
          <AlertCircle className="mx-auto mb-3 text-muted-foreground" size={32} />
          <p className="text-muted-foreground">No actions required at this time</p>
        </div>
      )}
    </div>
  );
}
