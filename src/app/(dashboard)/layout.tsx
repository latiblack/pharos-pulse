import Sidebar from '../../components/Sidebar';
import '../globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="lg:ml-[260px]">
        {children}
      </main>
    </div>
  );
}