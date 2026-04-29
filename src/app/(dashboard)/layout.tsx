import Sidebar from '../../components/Sidebar';
import '../globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-deep bg-grid bg-glow-top bg-glow-bottom">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}