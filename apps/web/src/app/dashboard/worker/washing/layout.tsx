import WashingNavbar from "./components/WashingNavbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
                    <WashingNavbar/>
                    {children}
                                   
        </main>
    );
}