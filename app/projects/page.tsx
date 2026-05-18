import { MainLayout } from '@/components/layout/main-layout';
import { ProjectFilters } from '@/components/projects/project-filters';
import { ProjectsTable } from '@/components/projects/projects-table';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Projects | Portfolio Management',
  description: 'Manage and view your projects',
};

export default function ProjectsPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Workspace', href: '/workspace' },
    { label: 'Projects' },
  ];

  return (
    <MainLayout title="Projects" breadcrumbs={breadcrumbs}>
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 w-full max-w-md">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent text-sm placeholder-muted-foreground focus:outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <ProjectFilters />

      {/* Projects Table */}
      <div className="mb-6">
        <ProjectsTable />
      </div>
    </MainLayout>
  );
}
