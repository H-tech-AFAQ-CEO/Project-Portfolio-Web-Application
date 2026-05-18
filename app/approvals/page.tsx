'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/ui/stat-card';
import { useState } from 'react';

const approvals = [
  { id: 1, title: 'Q1 Budget Approval', priority: 'High', requester: 'John Doe', daysWaiting: 5, status: 'Pending' },
  { id: 2, title: 'Project Charter - Website Redesign', priority: 'High', requester: 'Sarah Smith', daysWaiting: 3, status: 'Pending' },
  { id: 3, title: 'Vendor Contract - Tech Solutions', priority: 'Medium', requester: 'Mike Johnson', daysWaiting: 7, status: 'Pending' },
  { id: 4, title: 'Resource Allocation - Q1', priority: 'Medium', requester: 'Emma Wilson', daysWaiting: 2, status: 'Pending' },
  { id: 5, title: 'Change Request - Database Upgrade', priority: 'High', requester: 'Alex Brown', daysWaiting: 1, status: 'Pending' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ApprovalsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <MainLayout
      title="Approvals"
      breadcrumbs={[{ label: 'Approvals' }]}
    >
      {/* Summary Stats */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" variants={containerVariants} initial="hidden" animate="visible">
        <StatCard label="Pending Approvals" value={approvals.filter(a => a.status === 'Pending').length} variant="primary" />
        <StatCard label="Awaiting Your Action" value="3" />
        <StatCard label="Approved This Month" value="18" variant="success" />
        <StatCard label="Avg Wait Time" value="4.3d" />
      </motion.div>

      {/* Filter Bar */}
      <motion.div className="flex items-center gap-2 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Filter size={18} className="text-muted-foreground" />
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedFilter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter('high')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedFilter === 'high'
              ? 'bg-destructive text-white'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          High Priority
        </button>
      </motion.div>

      {/* Approvals List */}
      <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
        {approvals.map((approval, idx) => (
          <motion.div
            key={approval.id}
            className="card-elevated p-5 hover:shadow-md transition-all cursor-pointer"
            variants={itemVariants}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Priority Indicator */}
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  approval.priority === 'High' ? 'bg-destructive' : 'bg-primary'
                }`} />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{approval.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Requested by {approval.requester}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      approval.priority === 'High'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {approval.priority} Priority
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={14} />
                      <span>Waiting {approval.daysWaiting} days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="px-4 py-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium">
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </MainLayout>
  );
}
