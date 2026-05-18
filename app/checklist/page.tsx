'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Download } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { useState } from 'react';

const checklistGroups = [
  {
    title: 'Initiation',
    icon: '📋',
    items: [
      { id: 1, title: 'Define project objectives', completed: true },
      { id: 2, title: 'Identify stakeholders', completed: true },
      { id: 3, title: 'Create project charter', completed: false },
      { id: 4, title: 'Obtain executive approval', completed: false },
    ],
  },
  {
    title: 'Planning',
    icon: '📊',
    items: [
      { id: 5, title: 'Develop project schedule', completed: true },
      { id: 6, title: 'Establish budget', completed: true },
      { id: 7, title: 'Create risk register', completed: false },
      { id: 8, title: 'Define quality standards', completed: false },
      { id: 9, title: 'Identify resources', completed: false },
    ],
  },
  {
    title: 'Execution',
    icon: '🚀',
    items: [
      { id: 10, title: 'Assign tasks', completed: true },
      { id: 11, title: 'Conduct team meetings', completed: true },
      { id: 12, title: 'Monitor progress', completed: true },
      { id: 13, title: 'Manage changes', completed: false },
    ],
  },
  {
    title: 'Monitoring & Control',
    icon: '📈',
    items: [
      { id: 14, title: 'Track budget vs actual', completed: true },
      { id: 15, title: 'Review schedule performance', completed: false },
      { id: 16, title: 'Update risk register', completed: false },
      { id: 17, title: 'Report status', completed: false },
    ],
  },
  {
    title: 'Closure',
    icon: '✅',
    items: [
      { id: 18, title: 'Conduct final review', completed: false },
      { id: 19, title: 'Document lessons learned', completed: false },
      { id: 20, title: 'Release resources', completed: false },
      { id: 21, title: 'Archive project files', completed: false },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(checklistGroups);

  const totalItems = checklist.reduce((sum, group) => sum + group.items.length, 0);
  const completedItems = checklist.reduce((sum, group) => sum + group.items.filter((item) => item.completed).length, 0);
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const toggleItem = (groupIdx: number, itemIdx: number) => {
    const newChecklist = [...checklist];
    newChecklist[groupIdx].items[itemIdx].completed = !newChecklist[groupIdx].items[itemIdx].completed;
    setChecklist(newChecklist);
  };

  return (
    <MainLayout
      title="PL-Checklist"
      breadcrumbs={[{ label: 'PL-Checklist' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Download size={18} />
          Export
        </button>
      }
    >
      {/* Progress Bar */}
      <motion.div className="card-elevated p-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {completedItems} of {totalItems} items completed
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-primary">{completionPercentage}%</p>
          </div>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-success"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>

      {/* Checklist Groups */}
      <motion.div className="grid grid-cols-1 gap-6" variants={containerVariants} initial="hidden" animate="visible">
        {checklist.map((group, groupIdx) => {
          const groupCompleted = group.items.filter((item) => item.completed).length;
          const groupTotal = group.items.length;
          const groupPercentage = Math.round((groupCompleted / groupTotal) * 100);

          return (
            <motion.div key={group.title} className="card-elevated p-6" variants={groupVariants}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{group.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {groupCompleted} of {groupTotal} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{groupPercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: itemIdx * 0.05 }}
                    onClick={() => toggleItem(groupIdx, itemIdx)}
                  >
                    <button className="flex-shrink-0 transition-transform group-hover:scale-110">
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <span className={`flex-1 text-sm transition-all ${
                      item.completed
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}>
                      {item.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </MainLayout>
  );
}
