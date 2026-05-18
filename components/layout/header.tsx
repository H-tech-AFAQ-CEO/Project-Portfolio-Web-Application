'use client';

import { Search, Bell, Settings, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  action?: React.ReactNode;
}

export function Header({ title, breadcrumbs, action }: HeaderProps) {
  return (
    <header className="ml-64 border-b border-border sticky top-0 z-40 bg-transparent">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Breadcrumbs/Title */}
        <div className="flex flex-col gap-2 flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-border">/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
          {title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
        </div>

        {/* Center: Action Button */}
        {action && <div className="flex items-center">{action}</div>}

        {/* Right: Search, Notifications, User */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-64">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm placeholder-muted-foreground focus:outline-none flex-1"
            />
          </div>

          {/* Icons */}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell size={20} className="text-foreground" />
          </button>

          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings size={20} className="text-foreground" />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              JD
            </div>
            <span className="text-sm font-medium text-foreground">John Doe</span>
          </button>
        </div>
      </div>
    </header>
  );
}
