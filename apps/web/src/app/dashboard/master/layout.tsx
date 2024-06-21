import { Header } from '@/components/Header';
import Sidebar from './components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-mythemes-grey">
      <Header />
      <section className="md:grid md:grid-cols-10">
        <div className="hidden md:block sticky top-0 md:col-span-2 h-[94vh] bg-mythemes-maingreen">
          <Sidebar />
        </div>
        <div className="md:col-span-8 bg-mythemes-grey ">{children}</div>
      </section>
    </main>
  );
}
