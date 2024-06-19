import CreatePickupButton from "@/components/CreatePickupButton";
import PickupNavbar from "./components/PickupNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
                    <PickupNavbar/>
                    {children}
                                   
        </main>
    );
}