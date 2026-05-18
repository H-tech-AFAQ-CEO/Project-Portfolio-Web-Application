'use client';

import { motion } from 'framer-motion';
import { Folder, Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/ui/stat-card';
import { useState } from 'react';

const projects = [
  { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 65, manager: 'John Doe', team: 4, budget: '$45K' },
  { id: 2, name: 'Cloud Migration', status: 'In Progress', progress: 45, manager: 'Sarah Smith', team: 6, budget: '$120K' },
  { id: 3, name: 'Mobile App Dev', status: 'Active', progress: 78, manager: 'Mike Johnson', team: 5, budget: '$85K' },
  { id: 4, name: 'Data Analytics', status: 'Planning', progress: 20, manager: 'Emma Wilson', team: 3, budget: '$65K' },
  { id: 5, name: 'Security Audit', status: 'Completed', progress: 100, manager: 'Alex Brown', team: 4, budget: '$30K' },
  { id: 6, name: 'AI Integration', status: 'In Progress', progress: 52, manager: 'Lisa Chen', team: 7, budget: '$200K' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = Array.from(new Set(projects.map((p) => p.status)));

  return (
    <MainLayout
      title="Projects"
      breadcrumbs={[{ label: 'Workspace' }, { label: 'Projects' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Plus size={18} />
          New Project
        </button>
      }
    >
      {/* Summary Stats */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" variants={containerVariants} initial="hidden" animate="visible">
        <StatCard label="Total Projects" value={projects.length} />
        <StatCard label="Active" value={projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length} variant="primary" />
        <StatCard label="Completed" value={projects.filter(p => p.status === 'Completed').length} variant="success" />
        <StatCard label="Total Budget" value="$545K" />
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div className="flex flex-col md:flex-row gap-3 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter(null)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                !statusFilter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects List */}
      <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="card-elevated p-5 hover:shadow-md transition-all cursor-pointer group"
              variants={rowVariants}
              custom={idx}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
                {/* Left: Project Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Folder className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manager: {project.manager}</p>
                  </div>
                </div>

                {/* Middle: Progress */}
                <div className="flex-1 min-w-0 hidden md:block">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${
                      project.status === 'Completed'
                        ? 'bg-success/10 text-success'
                        : project.status === 'In Progress'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{project.budget}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Mobile: Progress Bar */}
              <div className="md:hidden mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{project.progress}%</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    project.status === 'Completed'
                      ? 'bg-success/10 text-success'
                      : project.status === 'In Progress'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="text-center py-12 card-elevated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Folder className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No projects found matching your search</p>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
}
