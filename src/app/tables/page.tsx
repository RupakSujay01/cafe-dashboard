import { Plus, Users } from "lucide-react";
import TopActions from "@/components/TopActions";
import { supabase } from "@/lib/supabase";

const statusColors: Record<string, string> = {
  "Occupied": "border-blue-500/50 bg-blue-500/10 text-blue-500",
  "Available": "border-emerald-500/50 bg-emerald-500/10 text-emerald-500",
  "Reserved": "border-orange-500/50 bg-orange-500/10 text-orange-500",
};

export default async function TablesPage() {
  const { data: tables = [] } = await supabase
    .from('tables')
    .select('*')
    .order('id', { ascending: true });

  return (
    <div className="flex flex-col gap-6 pb-10">
      <header className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Tables & Reservations
          </h1>
          <p className="text-muted-foreground mt-1">Manage seating capacity and upcoming reservations.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus size={16} strokeWidth={1.5} /> Book Table
          </button>
          <TopActions />
        </div>
      </header>
      
      <div className="grid grid-cols-3 gap-6">
        {(tables ?? []).map((table: any, i: number) => {
          const color = statusColors["Reserved"] || statusColors["Available"];
          return (
            <div key={i} className={`border p-6 rounded-2xl flex flex-col justify-between h-40 ${color}`}>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{table.id}</h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-background/50 border border-current/20">
                  Reserved
                </span>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users size={16} strokeWidth={1.5} />
                  {table.guests > 0 ? `${table.guests} Guests` : "Empty"}
                </div>
                <div className="text-sm font-medium">
                  {table.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

