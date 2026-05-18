'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutGrid,
  FolderOpen,
  ShoppingCart,
  Lightbulb,
  CheckCircle,
  Settings,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ListChecks,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: number;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home size={20} /> },
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutGrid size={20} /> },
  {
    label: 'My Workspace',
    icon: <FolderOpen size={20} />,
    children: [
      { label: 'Subportfolios', href: '/workspace/subportfolios', icon: <LayoutGrid size={16} /> },
      { label: 'Programs', href: '/workspace/programs', icon: <LayoutGrid size={16} /> },
      { label: 'Projects', href: '/workspace/projects', icon: <LayoutGrid size={16} /> },
      { label: 'Orders', href: '/workspace/orders', icon: <ShoppingCart size={16} /> },
      { label: 'Ideas', href: '/workspace/ideas', icon: <Lightbulb size={16} /> },
    ],
  },
  { label: 'Approvals', href: '/approvals', icon: <CheckCircle size={20} />, badge: 33 },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  { label: 'Lessons Learned', href: '/lessons-learned', icon: <BookOpen size={20} /> },
  { label: 'Help', href: '/help', icon: <HelpCircle size={20} /> },
  { label: 'PL-Checklist', href: '/checklist', icon: <ListChecks size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>('My Workspace');

  const isActive = (href?: string) => href && pathname.startsWith(href);

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemExpanded = expanded === item.label;

    return (
      <div key={item.label}>
        {item.href ? (
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.href)
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-sidebar-foreground hover:bg-muted'
            } ${level > 0 ? 'ml-4' : ''}`}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-xs font-semibold bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </Link>
        ) : (
          <>
            <button
              onClick={() => setExpanded(isItemExpanded ? null : item.label)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-muted"
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {hasChildren && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isItemExpanded ? 'rotate-180' : ''}`}
                />
              )}
            </button>
            {hasChildren && isItemExpanded && (
              <div className="mt-1 space-y-1">
                {item.children?.map((child) => renderNavItem(child, level + 1))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto pt-6 pb-6 px-3 flex flex-col fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="px-4 py-4 border-b border-sidebar-border mb-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">Portfolio</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">{navItems.map((item) => renderNavItem(item))}</nav>
    </aside>
  );
}
