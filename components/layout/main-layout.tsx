import { Sidebar } from './sidebar';
import { Header } from './header';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  action?: React.ReactNode;
}

export function MainLayout({ children, title, breadcrumbs, action }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header title={title} breadcrumbs={breadcrumbs} action={action} />
        <main className="flex-1 overflow-auto">
          <div className="px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
