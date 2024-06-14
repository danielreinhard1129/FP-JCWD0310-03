import Sidebar from "./components/Sidebar";



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='z-0 top-0 left-0'>
            <section className="md:grid md:grid-cols-10">            
                <div className="hidden md:block sticky top-0 md:col-span-2 h-screen bg-mythemes-maingreen pt-12">
                {/* <div className="col-span-2 w-1/5 bg-slate-400 pt-12"> */}
                    <Sidebar />
                </div>
                <div className="md:col-span-8 bg-mythemes-grey pt-12">
                {/* <div className="col-span-8 w-4/5 h-full bg-slate-200 pt-12"> */}
                    {children}
                </div>
            </section>
        </main>
    );
}