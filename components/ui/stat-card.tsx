'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down';
  trendPercent?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'primary';
}

export function StatCard({
  label,
  value,
  subtext,
  trend,
  trendPercent,
  icon,
  variant = 'default',
}: StatCardProps) {
  const bgVariants = {
    default: 'bg-card border border-border',
    success: 'bg-success/5 border border-success/20',
    primary: 'bg-primary/5 border border-primary/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${bgVariants[variant]} rounded-lg p-6 card-hover`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtext && <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>}
          {trend && trendPercent !== undefined && (
            <div className="mt-3 flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                {trendPercent}%
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-primary/40">{icon}</div>}
      </div>
    </motion.div>
  );
}
