'use client';

import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

export function ProjectFilters() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 card-elevated">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-primary" />
          <span className="font-semibold text-foreground">Projects Filters</span>
        </div>
        <span className="text-sm text-muted-foreground">
          Apply filters to refine the projects grid{' '}
          <span className="ml-2">🔽</span>
        </span>
        <ChevronDown
          size={20}
          className={`text-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-border px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filter: Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select className="w-full px-3 py-2 rounded border border-border bg-card text-foreground text-sm">
                <option>All Statuses</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Filter: Priority */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
              <select className="w-full px-3 py-2 rounded border border-border bg-card text-foreground text-sm">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* Filter: Manager */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Manager</label>
              <select className="w-full px-3 py-2 rounded border border-border bg-card text-foreground text-sm">
                <option>All Managers</option>
                <option>Manager A</option>
                <option>Manager B</option>
                <option>Manager C</option>
              </select>
            </div>

            {/* Filter: Date Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded border border-border bg-card text-foreground text-sm"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Apply Filters
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
