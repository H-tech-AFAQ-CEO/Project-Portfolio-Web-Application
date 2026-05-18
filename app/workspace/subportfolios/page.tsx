'use client';

import { motion } from 'framer-motion';
import { Folder, MoreVertical, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const portfolios = [
  { id: 1, name: 'Digital Transformation', status: 'Active', progress: 65, projects: 8, budget: '$250K' },
  { id: 2, name: 'Cloud Migration', status: 'Active', progress: 45, projects: 5, budget: '$180K' },
  { id: 3, name: 'AI Integration', status: 'Planning', progress: 20, projects: 3, budget: '$320K' },
  { id: 4, name: 'Legacy System Upgrade', status: 'On Hold', progress: 30, projects: 4, budget: '$150K' },
  { id: 5, name: 'Mobile App Development', status: 'Active', progress: 78, projects: 6, budget: '$200K' },
  { id: 6, name: 'Data Analytics Platform', status: 'Active', progress: 55, projects: 4, budget: '$210K' },
];

export default function SubportfoliosPage() {
  return (
    <MainLayout
      title="Subportfolios"
      breadcrumbs={[{ label: 'Workspace' }, { label: 'Subportfolios' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Plus size={18} />
          New Portfolio
        </button>
      }
    >
      {portfolios.length > 0 ? (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
          {portfolios.map((portfolio) => (
            <motion.div
              key={portfolio.id}
              className="card-elevated p-6 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Folder className="w-6 h-6 text-primary" />
                </div>
                <button className="p-2 rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical size={18} className="text-muted-foreground" />
                </button>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{portfolio.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{portfolio.projects} projects</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">Progress</span>
                  <span className="text-xs font-semibold text-primary">{portfolio.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${portfolio.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>

              {/* Status and Budget */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  portfolio.status === 'Active'
                    ? 'bg-success/10 text-success'
                    : portfolio.status === 'Planning'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {portfolio.status}
                </span>
                <span className="text-xs font-semibold text-foreground">{portfolio.budget}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={<Folder size={48} />}
          title="No Subportfolios Yet"
          description="Create your first portfolio to organize projects and resources"
          action={<button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Create Portfolio</button>}
        />
      )}
    </MainLayout>
  );
}
