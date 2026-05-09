import { Download, TrendingUp, Coins, CreditCard as CardIcon } from "lucide-react";
import TopActions from "@/components/TopActions";
import { supabase } from "@/lib/supabase";

export default async function AccountingPage() {
  const { data: transactions = [] } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 pb-10">
      <header className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Accounting & Revenue
          </h1>
          <p className="text-muted-foreground mt-1">View daily revenue, transactions, and tip payouts.</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-accent text-primary px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
            <Download size={16} /> Export CSV
          </button>
          <TopActions />
        </div>
      </header>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <p className="text-muted-foreground font-medium">Today's Revenue</p>
            <div className="bg-accent p-2 rounded-xl text-primary">
              <Coins size={20} />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold text-primary">₹62,425</h2>
            <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
              <TrendingUp size={12} /> +12.5% vs yesterday
            </p>
          </div>
        </div>

        <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <p className="text-muted-foreground font-medium">Total Transactions</p>
            <div className="bg-accent p-2 rounded-xl text-primary">
              <CardIcon size={20} />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold text-primary">142</h2>
            <p className="text-xs text-muted-foreground mt-2">Avg. ₹440 per transaction</p>
          </div>
        </div>

        <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <p className="text-muted-foreground font-medium">Total Tips</p>
            <div className="bg-accent p-2 rounded-xl text-primary">
              <Coins size={20} />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold text-primary">₹10,700</h2>
            <p className="text-xs text-muted-foreground mt-2">To be distributed</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-card-border p-6 rounded-2xl mt-4">
        <h3 className="text-lg font-semibold text-primary mb-4">Recent Transactions</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-card-border text-sm text-muted-foreground">
              <th className="font-medium pb-4">Transaction ID</th>
              <th className="font-medium pb-4 pl-4">Processed By</th>
              <th className="font-medium pb-4">Time</th>
              <th className="font-medium pb-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions && transactions.map((tx: any, i: number) => (
              <tr key={i} className="border-b border-card-border/50 hover:bg-accent/30 transition-colors last:border-0">
                <td className="py-4 font-medium text-primary">TX-{tx.id}</td>
                <td className="py-4 pl-4 flex items-center gap-3">
                  <img src={tx.img} className="w-8 h-8 rounded-full object-cover border border-card-border/50" alt={tx.processed_by} />
                  <span className="text-muted-foreground font-medium">{tx.processed_by}</span>
                </td>
                <td className="py-4 text-muted-foreground">{tx.time}</td>
                <td className="py-4 text-right text-primary font-medium">₹{Number(tx.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
