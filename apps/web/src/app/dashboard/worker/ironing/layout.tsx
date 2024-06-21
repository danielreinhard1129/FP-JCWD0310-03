import IroningNavbar from "./components/IroningNavbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
                    <IroningNavbar/>
                    {children}
                                   
        </main>
    );
}