'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, Zap } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { MainLayout } from '@/components/layout/main-layout';
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
  { name: 'Jan', value: 400, target: 450 },
  { name: 'Feb', value: 520, target: 500 },
  { name: 'Mar', value: 480, target: 500 },
  { name: 'Apr', value: 600, target: 550 },
  { name: 'May', value: 750, target: 700 },
  { name: 'Jun', value: 920, target: 800 },
];

const timelineData = [
  { name: 'Week 1', completed: 45 },
  { name: 'Week 2', completed: 58 },
  { name: 'Week 3', completed: 72 },
  { name: 'Week 4', completed: 88 },
];

export default function DashboardPage() {
  return (
    <MainLayout title="Dashboard" breadcrumbs={[{ label: 'Dashboard' }]}>
      <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
        {/* KPI Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" variants={itemVariants}>
          <StatCard
            label="Total Projects"
            value="24"
            subtext="Active projects"
            trend="up"
            trendPercent={12}
            icon={<Zap className="h-8 w-8" />}
            variant="primary"
          />
          <StatCard
            label="Completion Rate"
            value="87%"
            subtext="Projects on track"
            trend="up"
            trendPercent={5}
            icon={<TrendingUp className="h-8 w-8" />}
            variant="success"
          />
          <StatCard
            label="Team Members"
            value="42"
            subtext="Active participants"
            trend="down"
            trendPercent={2}
            icon={<Users className="h-8 w-8" />}
          />
          <StatCard
            label="Pending Approvals"
            value="8"
            subtext="Awaiting review"
            icon={<Clock className="h-8 w-8" />}
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={itemVariants}>
          {/* Budget vs Target Chart */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Budget vs Target</h3>
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
                <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="var(--color-success)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline Progress Chart */}
          <div className="card-elevated p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Completion Timeline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                  }}
                />
                <Line type="monotone" dataKey="completed" stroke="var(--color-success)" strokeWidth={2} dot={{ fill: 'var(--color-success)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="card-elevated p-6" variants={itemVariants}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { title: 'Project "Website Redesign" completed', time: '2 hours ago', user: 'John Doe' },
              { title: 'New idea submitted for Q2 planning', time: '4 hours ago', user: 'Sarah Smith' },
              { title: 'Budget approval from Finance', time: '1 day ago', user: 'Mike Johnson' },
              { title: 'Project milestone reached', time: '2 days ago', user: 'Emma Wilson' },
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-4 pb-3 border-b border-border last:border-b-0 last:pb-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time} by {activity.user}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
