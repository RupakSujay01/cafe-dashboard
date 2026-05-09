import Header from "@/components/Header";
import { Plus, Bell, CheckSquare, Coffee, Search, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import SalesGraph from "@/components/SalesGraph";
import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { data: activeOrders = [] } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: reservedTables = [] } = await supabase
    .from('tables')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(4);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <Header />

      {/* Summary Cards */}
      <section className="grid grid-cols-4 gap-6">
        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col justify-between h-44 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-muted-foreground font-medium font-sans">Active Orders</p>
            <div className="bg-accent/50 p-2.5 rounded-xl text-primary border border-card-border/50 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
              <Bell size={18} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-foreground tracking-tight">12</h2>
            <p className="text-xs text-muted-foreground mt-3 font-mono">* 3 ready to serve</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col justify-between h-44 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-muted-foreground font-medium font-sans">Total Orders</p>
            <div className="bg-accent/50 p-2.5 rounded-xl text-primary border border-card-border/50 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
              <CheckSquare size={18} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-foreground tracking-tight">148</h2>
            <p className="text-xs text-emerald-500/90 mt-3 font-mono">+24% vs yesterday</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col justify-between h-44 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <p className="text-muted-foreground font-medium font-sans">Tables In Use</p>
            <div className="bg-accent/50 p-2.5 rounded-xl text-primary border border-card-border/50 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
              <Coffee size={18} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-foreground tracking-tight">8<span className="text-2xl text-muted-foreground">/14</span></h2>
            <p className="text-xs text-primary/80 mt-3 font-mono">Near capacity</p>
          </div>
        </div>

        <Link href="/new" className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary text-primary-foreground hover:brightness-110 transition-all duration-500 p-6 rounded-3xl flex flex-col justify-center items-center h-44 gap-3 group shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:-translate-y-1">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat group-hover:bg-[position:-100%_0,0_0] transition-[background-position] duration-1000"></div>
          <Plus size={36} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300 ease-out relative z-10" />
          <span className="font-bold tracking-widest text-sm relative z-10">NEW ORDER</span>
        </Link>
      </section>

      {/* Full Width Graph Section */}
      <section className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col shadow-lg shadow-black/20">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp size={20} strokeWidth={1.5} className="text-primary" /> Orders Activity
          </h3>
        </div>
        <SalesGraph />
      </section>

      {/* Main Content Columns */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders List */}
        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col gap-6 shadow-lg shadow-black/20">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-foreground">Active Orders</h3>
            <Link href="/orders" className="text-xs text-foreground font-medium hover:text-foreground/80 transition-colors bg-accent/50 px-3 py-1.5 rounded-lg border border-card-border/50 hover:bg-accent uppercase tracking-widest">
              View All
            </Link>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={18} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Search active orders" 
              className="w-full bg-accent/30 border border-card-border/50 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-card-border focus:ring-1 focus:ring-card-border transition-all text-foreground font-sans placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2">
            {(activeOrders ?? []).map((order: any, i: number) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-accent/40 transition-colors border border-transparent hover:border-card-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-foreground shrink-0 group-hover:scale-105 group-hover:bg-accent/80 transition-all shadow-inner font-bold">
                  {order.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate font-sans">{order.customer_name} — {order.items}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{order.status}</p>
                </div>
                <div className={`px-2.5 py-1.5 rounded-md text-xs font-semibold shrink-0 uppercase tracking-wider border ${order.color?.replace('bg-', 'border-').replace('/20', '/30 bg-').replace('text-primary', 'text-foreground') ?? ''}`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reserved Tables */}
        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col gap-6 shadow-lg shadow-black/20">
          <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold text-foreground">Reserved Tables</h3>
             <Link href="/tables" className="text-xs text-foreground font-medium hover:text-foreground/80 transition-colors bg-accent/50 px-3 py-1.5 rounded-lg border border-card-border/50 hover:bg-accent uppercase tracking-widest">
               Manage
             </Link>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={18} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Search tables" 
              className="w-full bg-accent/30 border border-card-border/50 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-card-border focus:ring-1 focus:ring-card-border transition-all text-foreground font-sans placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2">
            {(reservedTables ?? []).map((table: any, i: number) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-accent/40 transition-colors border border-transparent hover:border-card-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-foreground shrink-0 group-hover:scale-105 group-hover:bg-accent/80 transition-all shadow-inner font-bold">
                  {table.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate font-sans">{table.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{table.guests} Guests • {table.time}</p>
                </div>
                <Link href="/tables" className="flex items-center gap-1.5 px-3 py-2 bg-accent/50 hover:bg-accent text-foreground border border-card-border/50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0">
                  Seat <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Top Menu Items */}
        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 p-6 rounded-3xl flex flex-col gap-5 shadow-lg shadow-black/20">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-foreground">Top Menu Items</h3>
            <Link href="/menu" className="text-xs text-foreground font-medium hover:text-foreground/80 transition-colors bg-accent/50 px-3 py-1.5 rounded-lg border border-card-border/50 hover:bg-accent uppercase tracking-widest">
              View All
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {['Oat Milk Latte', 'Pour Over (Ethiopia)', 'Almond Croissant', 'Cortado', 'Matcha Latte'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-accent/20 p-2 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent/50 border border-card-border flex items-center justify-center text-xs font-bold text-muted-foreground font-mono group-hover:text-foreground group-hover:border-card-border/80 transition-colors">
                  0{i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm font-sans">{item}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{24 - i * 3} orders today</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
