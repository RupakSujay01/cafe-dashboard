import { Plus, Sparkles, Coffee, Croissant, Utensils, GlassWater } from "lucide-react";
import TopActions from "@/components/TopActions";
import { supabase } from "@/lib/supabase";

export default async function MenuPage() {
  // Fetch items from Supabase
  const { data: allItems = [] } = await supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true });

  // Group items by category
  const groupedItems = (allItems ?? []).reduce((acc: Record<string, any[]>, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Static configuration for categories (icons and subcategories)
  const categoryConfig: Record<string, { subcategory: string; icon: React.ReactNode }> = {
    "COFFEE BAR": {
      subcategory: "Signature Classics",
      icon: <Coffee size={18} className="text-primary" />,
    },
    "CRAFTED BREWS": {
      subcategory: "Iced & Refreshing",
      icon: <GlassWater size={18} className="text-primary" />
    },
    "BAKERY COUNTER": {
      subcategory: "Fresh Bakes",
      icon: <Croissant size={18} className="text-primary" />
    },
    "TOASTED PLATES": {
      subcategory: "Toasts & Melts",
      icon: <Utensils size={18} className="text-primary" />
    },
    "HOUSE PAIRINGS": {
      subcategory: "Daily Favorites",
      icon: <Sparkles size={18} className="text-primary" />
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <header className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Curated Menu
          </h1>
          <p className="text-muted-foreground mt-1">Manage your premium specialty coffee offerings.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] tracking-wider">
            <Plus size={16} strokeWidth={1.5} /> NEW ITEM
          </button>
          <TopActions />
        </div>
      </header>
      
      {/* Editorial Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
        {Object.entries(groupedItems).map(([category, items]: [string, any[]], i) => {
          const config = categoryConfig[category] || { 
            subcategory: "Menu Items", 
            icon: <Coffee size={18} className="text-primary" /> 
          };
          
          return (
            <div 
              key={i} 
              className="bg-card/30 backdrop-blur-md border border-card-border/30 rounded-3xl p-6 shadow-lg shadow-black/20 flex flex-col gap-5 hover:border-primary/20 transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {config.icon}
                  </div>
                  <div>
                    <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">{category}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{config.subcategory}</p>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground/50 font-mono font-bold">
                  {items.length} ITEMS
                </span>
              </div>

              <div className="h-px bg-card-border/20 mx-1" />

              {/* Items List */}
              <div className="flex flex-col gap-2">
                {items.map((item, j) => {
                  // Special check for flavor enhancements to style it differently
                  const isEnhancement = item.name.includes('Vanilla • Hazelnut');
                  
                  return (
                    <div 
                      key={j} 
                      className={`flex justify-between items-baseline py-2.5 border-b border-card-border/10 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded-xl transition-colors cursor-pointer group/item ${
                        isEnhancement ? 'bg-primary/5 border border-primary/20 mt-2 hover:bg-primary/10' : ''
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-base font-medium ${isEnhancement ? 'text-primary' : 'text-foreground group-hover/item:text-primary'} transition-colors`}>
                          {item.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 ml-4 shrink-0">
                        <span className="text-sm font-mono text-primary font-semibold">
                          {item.price}
                        </span>
                        {!isEnhancement && (
                          <div 
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === 'Available' ? 'bg-emerald-500' : 'bg-orange-500'
                            } opacity-70 group-hover/item:opacity-100 transition-opacity`} 
                            title={item.status}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
