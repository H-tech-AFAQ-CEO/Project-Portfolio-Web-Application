'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, Mail } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { useState } from 'react';

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I create a new project?',
        a: 'Navigate to "My Workspace > Projects" and click "New Project". Fill in the project details and click Create. You can then assign team members and set up milestones.',
      },
      {
        q: 'How do I invite team members?',
        a: 'Go to Settings > Team Management and click "Invite Team Members". Enter their email address and select their role. They will receive an invitation email.',
      },
      {
        q: 'What are the different user roles?',
        a: 'Roles include Admin (full access), Manager (manage projects and teams), Contributor (work on projects), and Viewer (read-only access).',
      },
    ],
  },
  {
    category: 'Projects & Portfolios',
    items: [
      {
        q: 'How do I track project progress?',
        a: 'Use the Dashboard to view KPI metrics, or navigate to each project for detailed status updates. Progress is tracked through milestones and task completion.',
      },
      {
        q: 'Can I export project reports?',
        a: 'Yes, from the project details page, click the "Export" button to generate PDF or Excel reports.',
      },
    ],
  },
  {
    category: 'Approvals',
    items: [
      {
        q: 'How do approvals work?',
        a: 'When a request is submitted, it goes through a workflow with designated approvers. Each approver can approve, reject, or request changes.',
      },
      {
        q: 'How long does approval typically take?',
        a: 'Most approvals are completed within 1-3 business days, depending on the complexity and approver availability.',
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const allFaqs = faqs.flatMap((cat) => cat.items);
  const filteredFaqs = allFaqs.filter((faq) =>
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Help" breadcrumbs={[{ label: 'Help' }]}>
      {/* Search Bar */}
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {searchTerm ? (
        // Search Results
        <motion.div className="max-w-3xl mx-auto space-y-3" variants={containerVariants} initial="hidden" animate="visible">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="card-elevated p-6 cursor-pointer hover:shadow-md transition-all"
                variants={itemVariants}
                onClick={() => setExpandedFaq(expandedFaq === faq.q ? null : faq.q)}
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-semibold text-foreground flex-1">{faq.q}</h4>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-primary transition-transform ${
                      expandedFaq === faq.q ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {expandedFaq === faq.q && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 text-sm text-muted-foreground"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div className="text-center py-8" variants={itemVariants}>
              <HelpCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No help topics found. Try a different search.</p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        // All FAQs by Category
        <motion.div className="space-y-8 max-w-3xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          {faqs.map((category) => (
            <motion.div key={category.category} variants={itemVariants}>
              <h3 className="text-lg font-semibold text-foreground mb-4">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    className="card-elevated p-5 cursor-pointer group hover:shadow-md transition-all"
                    onClick={() => setExpandedFaq(expandedFaq === faq.q ? null : faq.q)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-medium text-foreground flex-1 group-hover:text-primary transition-colors">{faq.q}</h4>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 text-primary transition-transform ${
                          expandedFaq === faq.q ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {expandedFaq === faq.q && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-sm text-muted-foreground"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Contact Support */}
      <motion.div
        className="max-w-3xl mx-auto mt-12 card-elevated p-8 bg-primary/5 border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Mail className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Still need help?</h3>
            <p className="text-sm text-muted-foreground mt-1">Contact our support team for assistance</p>
          </div>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium btn-hover">
            Contact Support
          </button>
        </div>
      </motion.div>
    </MainLayout>
  );
}
