'use client';

import { motion } from 'framer-motion';
import { Layers, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/ui/stat-card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const programs = [
  { id: 1, name: 'Enterprise Modernization', status: 'Active', progress: 68, budget: 850000, spent: 520000, projects: 12, team: 8 },
  { id: 2, name: 'Customer Experience', status: 'Active', progress: 45, budget: 520000, spent: 234000, projects: 7, team: 6 },
  { id: 3, name: 'Operational Excellence', status: 'Planning', progress: 15, budget: 380000, spent: 56000, projects: 5, team: 4 },
  { id: 4, name: 'Digital Innovation', status: 'Active', progress: 72, budget: 650000, spent: 468000, projects: 9, team: 7 },
  { id: 5, name: 'Security & Compliance', status: 'Active', progress: 82, budget: 420000, spent: 344400, projects: 6, team: 5 },
];

export default function ProgramsPage() {
  return (
    <MainLayout
      title="Programs"
      breadcrumbs={[{ label: 'Workspace' }, { label: 'Programs' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Plus size={18} />
          New Program
        </button>
      }
    >
      {/* Summary Stats */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" variants={containerVariants} initial="hidden" animate="visible">
        <StatCard label="Total Programs" value={programs.length} />
        <StatCard label="Active Programs" value={programs.filter(p => p.status === 'Active').length} variant="primary" />
        <StatCard label="Total Budget" value="$2.82M" />
        <StatCard label="Budget Utilized" value="61.5%" variant="success" />
      </motion.div>

      {/* Programs Table */}
      <motion.div className="card-elevated overflow-hidden" variants={containerVariants} initial="hidden" animate="visible">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Program Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Projects</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Team</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, idx) => (
                <motion.tr
                  key={program.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  variants={rowVariants}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{program.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      program.status === 'Active'
                        ? 'bg-success/10 text-success'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {program.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{program.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${program.progress}%` }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">${(program.budget / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-muted-foreground">${(program.spent / 1000).toFixed(0)}K spent</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">{program.projects}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(program.team, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-semibold text-primary"
                        >
                          {i + 1}
                        </div>
                      ))}
                      {program.team > 3 && (
                        <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-semibold text-muted-foreground">
                          +{program.team - 3}
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </MainLayout>
  );
}
