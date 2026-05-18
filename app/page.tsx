'use client';

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/ui/stat-card';
import { ArrowRight, BarChart3, Clock, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const chartData = [
  { name: 'Jan', projects: 12, completed: 8 },
  { name: 'Feb', projects: 15, completed: 12 },
  { name: 'Mar', projects: 18, completed: 15 },
  { name: 'Apr', projects: 20, completed: 18 },
  { name: 'May', projects: 24, completed: 20 },
  { name: 'Jun', projects: 24, completed: 22 },
];

const recentActivities = [
  { id: 1, title: 'Project "Cloud Migration" started', time: '2 hours ago', icon: '🚀' },
  { id: 2, title: 'Budget approval from Finance team', time: '4 hours ago', icon: '✅' },
  { id: 3, title: 'New team member added: Sarah Johnson', time: '1 day ago', icon: '👤' },
  { id: 4, title: 'Q1 planning completed', time: '2 days ago', icon: '📋' },
];

const quickLinks = [
  { label: 'View Projects', href: '/workspace/projects', icon: '📁' },
  { label: 'Create Idea', href: '/workspace/ideas', icon: '💡' },
  { label: 'Check Approvals', href: '/approvals', icon: '✓' },
  { label: 'Team Settings', href: '/settings', icon: '⚙️' },
];

export default function HomePage() {
  return (
    <MainLayout title="Home" breadcrumbs={[{ label: 'Home' }]}>
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        {/* Welcome Section */}
        <motion.div
          className="card-elevated p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
          variants={itemVariants}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, John Doe!</h2>
            <p className="text-muted-foreground">Your portfolio is performing well this quarter. Keep up the great work!</p>
            <div className="flex gap-3 mt-6">
              <Link
                href="/workspace/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium btn-hover"
              >
                <span>View All Projects</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/workspace/ideas"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
              >
                <span>Submit New Idea</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          <StatCard
            label="Active Projects"
            value="24"
            subtext="Across all portfolios"
            trend="up"
            trendPercent={8}
            icon={<BarChart3 className="h-8 w-8" />}
            variant="primary"
          />
          <StatCard
            label="Completion Rate"
            value="84%"
            subtext="This quarter"
            trend="up"
            trendPercent={12}
            icon={<TrendingUp className="h-8 w-8" />}
            variant="success"
          />
          <StatCard
            label="Team Members"
            value="42"
            subtext="Across projects"
            icon={<Users className="h-8 w-8" />}
          />
          <StatCard
            label="Pending Reviews"
            value="8"
            subtext="Awaiting action"
            icon={<Clock className="h-8 w-8" />}
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
          {/* Projects Over Time */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Projects Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Completion vs Total */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Completion Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                  }}
                />
                <Bar dataKey="completed" fill="var(--color-success)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="projects" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity & Quick Links */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
          {/* Recent Activity */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <span className="text-lg">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block p-4 rounded-lg bg-muted hover:bg-muted/80 transition-all border border-transparent hover:border-primary text-center group"
                  >
                    <span className="text-2xl block mb-2">{link.icon}</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
