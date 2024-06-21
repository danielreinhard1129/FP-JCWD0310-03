import PackingNavbar from "./components/PackingNavbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
                    <PackingNavbar/>
                    {children}
                                   
        </main>
    );
}