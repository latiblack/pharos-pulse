import Sidebar from '../../components/Sidebar';
import '../globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#030307]">
      <Sidebar />
      <main className="lg:ml-[240px] min-h-screen p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}