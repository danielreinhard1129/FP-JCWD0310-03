import { Header } from '../components/Header';
import Sidebar from './components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="md:grid md:grid-cols-6">
        <div className="hidden md:block sticky top-0 col-span-1 h-screen bg-mythemes-maingreen overflow-hidden">
          <div className="bg-mythemes-secondaryblue rounded-full size-[450px] absolute -z-10 -left-48 mt-[600px] "></div>
          <div className="bg-mythemes-mainYellow/90 rounded-full size-80 absolute -z-10 -right-48 mt-96 "></div>
          <Sidebar />
        </div>
        <div className="md: col-span-5">
          <div className="md:hidden block sticky z-50 top-0">
            <Header />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
