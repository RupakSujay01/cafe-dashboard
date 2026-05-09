import { Search } from "lucide-react";
import TopActions from "@/components/TopActions";
import { supabase } from "@/lib/supabase";

export default async function OrdersPage() {
  const { data: orders = [] } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 pb-10">
      <header className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Active Orders
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track all active orders.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-card border border-card-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary text-primary"
            />
          </div>
          <TopActions />
        </div>
      </header>
      
      <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-6 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-primary">Live Orders Queue</h3>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-card-border/50 bg-accent/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-card-border/50 text-sm text-muted-foreground bg-accent/30">
                <th className="font-medium p-4 pl-6">Order</th>
                <th className="font-medium p-4">Customer</th>
                <th className="font-medium p-4">Items</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders && orders.map((order: any, i: number) => (
                <tr key={i} className="border-b border-card-border/30 hover:bg-accent/40 transition-colors last:border-0 group">
                  <td className="p-4 pl-6">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary font-semibold text-sm">
                      {order.id}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/80 border border-card-border/50 flex items-center justify-center text-xs">
                      {order.customer_name.charAt(0)}
                    </div>
                    {order.customer_name}
                  </td>
                  <td className="p-4 text-muted-foreground">{order.items}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-xs text-primary font-medium hover:text-primary/80 transition-colors bg-accent/50 px-3 py-1.5 rounded-lg border border-card-border/50 hover:bg-accent opacity-0 group-hover:opacity-100">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
