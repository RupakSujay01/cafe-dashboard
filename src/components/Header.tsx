import TopActions from "./TopActions";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <header className="flex items-center justify-between py-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Nice! You have <span className="text-primary italic">12 active orders</span>
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground font-medium hidden md:block font-mono uppercase tracking-wider">
          {today}
        </div>
        <TopActions />
      </div>
    </header>
  );
}
