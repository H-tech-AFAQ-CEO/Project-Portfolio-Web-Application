import { MainLayout } from '@/components/layout/main-layout';
import { DocumentsSection } from '@/components/projects/documents-section';
import { ActionsSection } from '@/components/projects/actions-section';
import { WorkflowDetail } from '@/components/projects/workflow-detail';
import { Calendar, User, DollarSign, Users } from 'lucide-react';

interface ProjectDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  return {
    title: `Project ${params.id} | Portfolio Management`,
    description: 'View and manage project details',
  };
}

// Mock data for project details
const mockProjectDetail = {
  id: 'IA20',
  name: 'Idea 20 - Digital Transformation Initiative',
  status: 'active',
  description: 'Comprehensive digital transformation project across all departments',
  startDate: '2025-07-03',
  endDate: '2026-07-03',
  manager: 'Sarah Johnson',
  sponsor: 'Michael Chen',
  budget: '$2,500,000',
  team: ['Sarah Johnson', 'David Smith', 'Emily Chen', 'Robert Williams'],
  workflow: [
    {
      role: 'PMO',
      status: 'approved' as const,
      date: '11. Nov 2025',
      person: '-',
    },
    {
      role: 'SPONSOR',
      status: 'approved' as const,
      date: '11. Nov 2025',
      person: '-',
    },
    {
      role: 'FICO',
      status: 'approved' as const,
      date: '11. Nov 2025',
      person: '-',
    },
  ],
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Workspace', href: '/workspace' },
    { label: 'Projects', href: '/projects' },
    { label: mockProjectDetail.name },
  ];

  return (
    <MainLayout title={mockProjectDetail.name} breadcrumbs={breadcrumbs}>
      {/* Project Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Start Date</span>
          </div>
          <p className="text-sm font-medium text-foreground">{mockProjectDetail.startDate}</p>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">End Date</span>
          </div>
          <p className="text-sm font-medium text-foreground">{mockProjectDetail.endDate}</p>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Budget</span>
          </div>
          <p className="text-sm font-medium text-foreground">{mockProjectDetail.budget}</p>
        </div>

        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Team Size</span>
          </div>
          <p className="text-sm font-medium text-foreground">{mockProjectDetail.team.length} members</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Documents and Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Documents Section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Documents</h2>
            <DocumentsSection />
          </div>

          {/* Actions Section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Actions</h2>
            <ActionsSection />
          </div>
        </div>

        {/* Right Column - Project Info */}
        <div className="space-y-6">
          {/* Key Contacts */}
          <div className="card-elevated p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Key Contacts
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                  Project Manager
                </p>
                <p className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-base">👤</span> {mockProjectDetail.manager}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                  Sponsor
                </p>
                <p className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-base">👤</span> {mockProjectDetail.sponsor}
                </p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="card-elevated p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Team Members
            </h3>
            <div className="space-y-2">
              {mockProjectDetail.team.map((member, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-foreground pb-2 border-b border-border last:border-0">
                  <span className="text-base">👤</span> {member}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Approval Workflow</h2>
        <div className="card-elevated p-6">
          <WorkflowDetail steps={mockProjectDetail.workflow} />
          <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
            <p className="text-sm text-success font-medium">
              ✓ Order has been approved by all stakeholders.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
