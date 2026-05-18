'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { WorkflowPreview } from './workflow-preview';
import { StatusBadge } from './status-badge';

interface Project {
  id: string;
  name: string;
  manager: string;
  role: string;
  document: string;
  priority: number;
  financeBy: string;
  submissionDate: string;
  decision: string;
  workflow: Array<{ role: string; completed: boolean }>;
}

const mockProjects: Project[] = [
  {
    id: 'IA20',
    name: 'Idea 20',
    manager: 'Manager, Portfolio',
    role: 'PMO',
    document: 'Idea',
    priority: 1,
    financeBy: 'Development Proje',
    submissionDate: '03.07.2025',
    decision: 'Open',
    workflow: [
      { role: 'SPONSOR', completed: true },
      { role: 'PMO', completed: false },
    ],
  },
  {
    id: '524',
    name: 'Idea 39',
    manager: 'Manager, Portfolio',
    role: 'PMO',
    document: 'Order',
    priority: 2,
    financeBy: 'Development Proje',
    submissionDate: '03.07.2025',
    decision: 'Approved',
    workflow: [
      { role: 'SPONSOR', completed: true },
      { role: 'PMO', completed: true },
    ],
  },
];

interface ProjectsTableProps {
  onProjectSelect?: (projectId: string) => void;
}

export function ProjectsTable({ onProjectSelect }: ProjectsTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (projectId: string) => {
    setExpandedRows((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  const handleRowClick = (projectId: string) => {
    onProjectSelect?.(projectId);
  };

  return (
    <div className="overflow-x-auto card-elevated">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground w-8" />
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">
              Project Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">
              Project Manager
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">Role</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">
              Document
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">Priority</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">
              Finance By
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">
              Submission Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">Action</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-foreground">Decision</th>
          </tr>
        </thead>
        <tbody>
          {mockProjects.map((project) => (
            <tbody key={project.id}>
              <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleRow(project.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    {expandedRows.includes(project.id) ? (
                      <ChevronDown size={18} className="text-foreground" />
                    ) : (
                      <ChevronRight size={18} className="text-foreground" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{project.id}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.name}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.manager}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.role}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.document}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.priority}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.financeBy}</td>
                <td className="px-6 py-4 text-sm text-foreground">{project.submissionDate}</td>
                <td className="px-6 py-4">
                  <select className="text-sm px-2 py-1 rounded border border-border bg-card text-foreground">
                    <option>Select</option>
                    <option>Approve</option>
                    <option>Reject</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    status={project.decision === 'Approved' ? 'approved' : 'pending'}
                    label={project.decision}
                  />
                </td>
              </tr>

              {/* Expanded row - Workflow preview */}
              {expandedRows.includes(project.id) && (
                <tr className="border-b border-border bg-muted/30">
                  <td colSpan={11} className="px-6 py-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4">Workflow</h4>
                        <WorkflowPreview steps={project.workflow} />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </tbody>
      </table>
    </div>
  );
}
