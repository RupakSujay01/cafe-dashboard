import TopActions from "@/components/TopActions";
import { supabase } from "@/lib/supabase";
import NewOrderForm from "./NewOrderForm";

export default async function NewOrderPage() {
  const { data: menuItems = [] } = await supabase
    .from('menu_items')
    .select('*')
    .eq('status', 'Available')
    .order('category', { ascending: true });

  return (
    <div className="flex flex-col gap-4 pb-10">
      <header className="flex items-center justify-between pt-6 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            New Order
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Build and place an order for dine-in or takeout service.
          </p>
        </div>
        <TopActions />
      </header>

      <NewOrderForm menuItems={menuItems ?? []} />
    </div>
  );
}
