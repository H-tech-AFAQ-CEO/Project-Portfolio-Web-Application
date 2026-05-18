'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Download, Plus, Search } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { StatCard } from '@/components/ui/stat-card';
import { useState } from 'react';

const orders = [
  { id: 'ORD-001', vendor: 'Tech Solutions Inc', amount: 45000, status: 'Completed', date: '2025-01-15', payment: 'Paid' },
  { id: 'ORD-002', vendor: 'Cloud Services Ltd', amount: 62500, status: 'Completed', date: '2025-01-18', payment: 'Paid' },
  { id: 'ORD-003', vendor: 'Software House', amount: 28000, status: 'Pending', date: '2025-02-01', payment: 'Pending' },
  { id: 'ORD-004', vendor: 'Design Agency Co', amount: 15000, status: 'In Progress', date: '2025-02-05', payment: 'Partial' },
  { id: 'ORD-005', vendor: 'Consulting Partners', amount: 85000, status: 'Completed', date: '2025-02-10', payment: 'Paid' },
  { id: 'ORD-006', vendor: 'Infrastructure Experts', amount: 120000, status: 'Completed', date: '2025-02-15', payment: 'Paid' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedAmount = orders.filter(o => o.status === 'Completed').reduce((sum, order) => sum + order.amount, 0);

  return (
    <MainLayout
      title="Orders"
      breadcrumbs={[{ label: 'Workspace' }, { label: 'Orders' }]}
      action={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-hover">
          <Plus size={18} />
          New Order
        </button>
      }
    >
      {/* Summary Stats */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" variants={containerVariants} initial="hidden" animate="visible">
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Amount" value={`$${(totalAmount / 1000).toFixed(0)}K`} variant="primary" />
        <StatCard label="Completed" value={`$${(completedAmount / 1000).toFixed(0)}K`} variant="success" />
        <StatCard label="Pending Payment" value="$43K" />
      </motion.div>

      {/* Search Bar */}
      <motion.div className="mb-6 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div className="card-elevated overflow-hidden" variants={containerVariants} initial="hidden" animate="visible">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Vendor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <motion.tr
                  key={order.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                  variants={rowVariants}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{order.vendor}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">${(order.amount / 1000).toFixed(1)}K</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      order.status === 'Completed'
                        ? 'bg-success/10 text-success'
                        : order.status === 'In Progress'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      order.payment === 'Paid'
                        ? 'bg-success/10 text-success'
                        : order.payment === 'Partial'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-destructive/10 text-destructive'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                      <Download size={16} />
                      Invoice
                    </button>
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
