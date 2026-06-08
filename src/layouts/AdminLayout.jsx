import Sidebar from "../features/admin/components/Sidebar";
import Header from "../features/admin/components/Header";

export default function AdminLayout({
  title,
  subtitle,
  actionLabel,
  onAction,
  children,
  fullWidth = false,
}) {
  return (
    <div className="bg-slate-50 min-h-screen flex text-slate-800 font-body">
      <Sidebar />

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Header
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          onAction={onAction}
        />

        <section
          className={`p-6 flex-1 ${fullWidth ? "" : "max-w-7xl mx-auto w-full"}`}
        >
          {children}
        </section>
      </main>
    </div>
  );
}
