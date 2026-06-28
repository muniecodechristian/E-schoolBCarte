import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSidebar";
import Admin from "./PAGES/Admin";
import { HeroSection } from "./components/blocks/hero-section-1";
import Home from "./pages/Home";



export default function Dashboard() {


  const user =null; // Replace with your user authentication logic

  if (!user) return <Home />;
  return (
    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>

        <header className="h-16 flex items-center px-6 border-b">
          <SidebarTrigger />
        </header>

        <main className="p-6">
          test
          
        </main>

      </SidebarInset>




      <HeroSection/>

    </SidebarProvider>
  );
}