import { Header } from "@/components/Header";
import Sidebar from "./components/Sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className=''>
            <Header/>
            <section className="md:grid md:grid-cols-10">            
                <div className="hidden md:block sticky top-0 md:col-span-2 h-screen bg-mythemes-maingreen pt-12">
                    <Sidebar />
                </div>
                <div className="md:col-span-8 bg-mythemes-grey pt-12">
                    {children}
                </div>
            </section>
        </main>
    );
}