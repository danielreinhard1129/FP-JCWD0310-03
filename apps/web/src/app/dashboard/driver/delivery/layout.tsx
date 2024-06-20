import DeliveryNavbar from "./components/DeliveryNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
                    <DeliveryNavbar/>
                    {children}                                   
        </main>
    );
}