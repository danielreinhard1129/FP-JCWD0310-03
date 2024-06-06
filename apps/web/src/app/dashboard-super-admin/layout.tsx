import Sidebar from "./components/Sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='absolute z-0 top-0 left-0 w-screen'>
            <section className="grid grid-cols-10">
                <div className="col-span-2 min-w-full h-screen bg-slate-400 pt-12">
                    <Sidebar />
                </div>
                <div className="col-span-8 min-w-full min-h-screen bg-slate-200 pt-12">
                    {children}
                </div>
            </section>
        </main>
    );
}