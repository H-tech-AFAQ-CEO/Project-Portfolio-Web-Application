'use client';

import { useState } from 'react';
import { FileText, Lock } from 'lucide-react';

interface Document {
  id: string;
  label: string;
  enabled: boolean;
}

const documents: Document[] = [
  { id: 'outline', label: 'Project Outline', enabled: true },
  { id: 'order', label: 'Project Order', enabled: true },
  { id: 'change', label: 'Change Request 1', enabled: false },
  { id: 'report', label: 'Closing Report', enabled: true },
  { id: 'idea', label: 'Idea', enabled: true },
];

interface DocumentsSectionProps {
  activeTab?: string;
}

export function DocumentsSection({ activeTab = 'outline' }: DocumentsSectionProps) {
  const [active, setActive] = useState(activeTab);

  const getTabContent = (tabId: string) => {
    const contentMap: Record<string, React.ReactNode> = {
      outline: (
        <div className="space-y-3">
          <p className="text-foreground">Project Outline Details</p>
          <p className="text-muted-foreground text-sm">
            This document contains the high-level overview and scope of the project including objectives,
            deliverables, timeline, and budget allocation.
          </p>
        </div>
      ),
      order: (
        <div className="space-y-3">
          <p className="text-foreground">Project Order Details</p>
          <p className="text-muted-foreground text-sm">
            Contains the formal project order with specifications, approval signatures, and budget commitment.
          </p>
        </div>
      ),
      change: (
        <div className="space-y-3">
          <p className="text-foreground">Change Request Details</p>
          <p className="text-muted-foreground text-sm">Locked document - requires approval to view.</p>
        </div>
      ),
      report: (
        <div className="space-y-3">
          <p className="text-foreground">Closing Report Details</p>
          <p className="text-muted-foreground text-sm">
            Final project report including lessons learned, budget reconciliation, and stakeholder feedback.
          </p>
        </div>
      ),
      idea: (
        <div className="space-y-3">
          <p className="text-foreground">Idea Details</p>
          <p className="text-muted-foreground text-sm">Original idea submission and supporting documentation.</p>
        </div>
      ),
    };

    return contentMap[tabId] || null;
  };

  return (
    <div className="card-elevated">
      <div className="border-b border-border">
        <div className="flex flex-wrap gap-2 p-6">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => doc.enabled && setActive(doc.id)}
              disabled={!doc.enabled}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === doc.id
                  ? 'bg-primary text-primary-foreground'
                  : doc.enabled
                    ? 'bg-muted text-foreground hover:bg-muted/80'
                    : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
              }`}
            >
              {!doc.enabled && <Lock size={14} />}
              {doc.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <FileText size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              {documents.find((d) => d.id === active)?.label}
            </h3>
          </div>
        </div>
        <div className="mt-4">{getTabContent(active)}</div>
      </div>
    </div>
  );
}
