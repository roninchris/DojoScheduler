'use client';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarContent } from "./sidebar";
import { ThemeToggle } from "../theme-toggle";

export function MobileHeader() {
  return (
    <header className="md:hidden bg-card border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-6">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <ThemeToggle />
    </header>
  );
}