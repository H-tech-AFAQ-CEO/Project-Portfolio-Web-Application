'use client';

import { motion } from 'framer-motion';
import { BookOpen, Search, Tag, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { useState } from 'react';

const lessons = [
  { id: 1, title: 'Effective Stakeholder Communication', project: 'Website Redesign', date: '2025-02-10', category: 'Management', views: 145 },
  { id: 2, title: 'Agile Sprint Planning Best Practices', project: 'Mobile App', date: '2025-02-08', category: 'Process', views: 98 },
  { id: 3, title: 'Risk Management in Large Projects', project: 'Cloud Migration', date: '2025-02-05', category: 'Risk', views: 234 },
  { id: 4, title: 'Resource Optimization Techniques', project: 'Digital Transformation', date: '2025-02-01', category: 'Resources', views: 156 },
  { id: 5, title: 'Quality Assurance Improvements', project: 'Software Development', date: '2025-01-28', category: 'Quality', views: 112 },
  { id: 6, title: 'Budget Control and Forecasting', project: 'Enterprise System', date: '2025-01-25', category: 'Finance', views: 189 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function LessonsLearned() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Management', 'Process', 'Risk', 'Resources', 'Quality', 'Finance'];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout
      title="Lessons Learned"
      breadcrumbs={[{ label: 'Lessons Learned' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Plus size={18} />
          Add Lesson
        </button>
      }
    >
      {/* Search Bar */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div className="flex flex-wrap gap-2 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !selectedCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            <Tag size={16} />
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Lessons Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" variants={containerVariants} initial="hidden" animate="visible">
        {filteredLessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            className="card-elevated p-5 cursor-pointer group hover:shadow-lg transition-all"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {lesson.category}
              </span>
            </div>

            <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {lesson.title}
            </h3>

            <p className="text-xs text-muted-foreground mb-4">
              From <span className="font-medium text-foreground">{lesson.project}</span>
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">{lesson.date}</span>
              <span className="text-xs font-medium text-primary">{lesson.views} views</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredLessons.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No lessons found matching your search</p>
        </motion.div>
      )}
    </MainLayout>
  );
}
