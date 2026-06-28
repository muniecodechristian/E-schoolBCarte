import { HeroSection } from "@/components/blocks/hero-section-1";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {


 
  return (
     <>
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
    </>
  );
}