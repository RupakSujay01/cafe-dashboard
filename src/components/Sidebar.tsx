"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Grid, 
  Coffee, 
  CreditCard, 
  Settings,
  LifeBuoy
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Active Orders", href: "/orders", icon: FileText },
    { name: "Tables", href: "/tables", icon: Grid },
    { name: "Menu", href: "/menu", icon: Coffee },
    { name: "Accounting", href: "/accounting", icon: CreditCard },
  ];

  const bottomItems = [
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-card-border flex flex-col h-screen fixed left-0 top-0 text-muted-foreground p-6 font-sans">
      <div className="flex items-center gap-3 text-primary mb-12 px-2">
        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(201,168,76,0.3)] flex items-center justify-center">
          <span className="text-xl font-bold" style={{ fontFamily: '"Dancing Script", cursive, "Brush Script MT"' }}>R</span>
        </div>
        <span className="font-bold text-xl tracking-wide" style={{ fontFamily: '"Tiempos Headline", "Playfair Display", Georgia, serif' }}>Roastery</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-accent/80 text-primary shadow-inner border border-card-border/50" 
                  : "hover:bg-accent/40 hover:text-primary hover:translate-x-1"
              }`}
            >
              <Icon size={18} strokeWidth={1.5} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-3'}`} />
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-card-border space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-accent/80 text-primary shadow-inner border border-card-border/50" 
                  : "hover:bg-accent/40 hover:text-primary hover:translate-x-1"
              }`}
            >
              <Icon size={18} strokeWidth={1.5} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-3'}`} />
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
