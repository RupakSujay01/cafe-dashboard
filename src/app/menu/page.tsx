import { Plus } from "lucide-react";
import TopActions from "@/components/TopActions";
import { supabase } from "@/lib/supabase";

export default async function MenuPage() {
  const { data: allItems = [] } = await supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true });

  // Group flat rows by category for the sectioned UI
  const menuItems = (allItems ?? []).reduce((acc: Record<string, any[]>, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6 pb-10">
      <header className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Menu & Inventory
          </h1>
          <p className="text-muted-foreground mt-1">Manage roasts, pastries, and available stock.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] tracking-wider">
            <Plus size={16} strokeWidth={1.5} /> NEW ITEM
          </button>
          <TopActions />
        </div>
      </header>
      
      <div className="flex flex-col gap-8 mt-2">
        {Object.entries(menuItems).map(([category, items]: [string, any[]], i: number) => (
          <div key={i} className="bg-card/50 backdrop-blur-md border border-card-border/50 rounded-3xl overflow-hidden shadow-lg shadow-black/20">
            <div className="bg-accent/30 px-6 py-5 border-b border-card-border/50">
              <h2 className="font-bold text-xl text-primary">{category}</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <tbody className="text-sm">
                {items.map((item: any, j: number) => (
                  <tr key={j} className="border-b border-card-border/30 hover:bg-accent/40 transition-colors last:border-0 group cursor-pointer">
                    <td className="p-5 pl-6 font-semibold text-foreground">{item.name}</td>
                    <td className="p-5 text-muted-foreground font-mono">{item.price}</td>
                    <td className="p-5 pr-6 text-right">
                      <span className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border ${
                        item.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 
                        item.status === 'Low Stock' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' : 
                        'bg-red-500/10 text-red-500 border-red-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

