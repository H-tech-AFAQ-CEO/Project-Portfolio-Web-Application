'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Plus, Star } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { useState } from 'react';

const ideas = [
  { id: 1, title: 'Mobile App Redesign', category: 'Product', votes: 24, status: 'Backlog' },
  { id: 2, title: 'API Documentation', category: 'Technical', votes: 18, status: 'In Review' },
  { id: 3, title: 'Customer Portal', category: 'Feature', votes: 32, status: 'In Review' },
  { id: 4, title: 'Analytics Dashboard', category: 'Product', votes: 28, status: 'Approved' },
  { id: 5, title: 'Performance Optimization', category: 'Technical', votes: 15, status: 'Backlog' },
  { id: 6, title: 'Dark Mode Support', category: 'Feature', votes: 42, status: 'Approved' },
  { id: 7, title: 'Automated Testing Suite', category: 'Technical', votes: 20, status: 'In Review' },
  { id: 8, title: 'User Feedback System', category: 'Product', votes: 31, status: 'Approved' },
];

const statuses = ['Backlog', 'In Review', 'Approved'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const columnVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function IdeasPage() {
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <MainLayout
      title="Ideas"
      breadcrumbs={[{ label: 'Workspace' }, { label: 'Ideas' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Plus size={18} />
          New Idea
        </button>
      }
    >
      {/* Kanban Board */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
        {statuses.map((status) => {
          const statusIdeas = ideas.filter((idea) => idea.status === status);
          const statusColors = {
            Backlog: 'bg-muted/40 border-muted',
            'In Review': 'bg-primary/5 border-primary/20',
            Approved: 'bg-success/5 border-success/20',
          };

          return (
            <motion.div
              key={status}
              className={`rounded-lg border ${statusColors[status as keyof typeof statusColors]} p-4`}
              variants={columnVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{status}</h3>
                <span className="text-sm font-semibold text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  {statusIdeas.length}
                </span>
              </div>

              <div className="space-y-3">
                {statusIdeas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all card-hover"
                    variants={cardVariants}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2">{idea.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{idea.category}</p>
                      </div>
                      <button
                        onClick={() =>
                          setLiked((prev) =>
                            prev.includes(idea.id) ? prev.filter((id) => id !== idea.id) : [...prev, idea.id]
                          )
                        }
                        className="flex-shrink-0 transition-transform hover:scale-110"
                      >
                        <Star
                          size={16}
                          className={liked.includes(idea.id) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                        />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="font-semibold text-primary">{idea.votes} votes</span>
                      <span className="text-muted-foreground">{idea.votes > 25 ? '🔥 Hot' : ''}</span>
                    </div>
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
