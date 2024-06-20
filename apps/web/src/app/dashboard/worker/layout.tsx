
import CreatePickupButton from "@/components/CreatePickupButton";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="max-w-[430px] mx-auto">
                    {children}
                    <CreatePickupButton/>                
        </main>
    );
}