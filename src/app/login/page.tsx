import LoginForm from './LoginForm'
import CoffeeSteam from '@/components/CoffeeSteam'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">

      {/* ── LEFT: Visual Panel ── */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-[#0D0D12]">
        {/* Base fill */}
        <div className="absolute inset-0 bg-[#0D0D12]" />

        {/* Cup image — contained and scaled down */}
        <img
          src="/cup.png"
          alt="Roastery branded coffee cup"
          className="absolute inset-0 w-full h-full object-contain scale-[0.70]"
          style={{ 
            maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
          }}
        />

        {/* Edge bleed: force #0D0D12 from all edges inward */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0D0D12_65%)]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0D0D12] via-[#0D0D12]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/80 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#0D0D12] via-[#0D0D12]/60 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#0D0D12] via-[#0D0D12]/60 to-transparent" />

        {/* SVG Steam overlay */}
        <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-80 h-56 z-20">
          <CoffeeSteam />
        </div>
      </div>

      {/* ── DIVIDER: Elegant separator ── */}
      <div className="hidden lg:flex relative z-30 w-[1px] flex-col items-center justify-center">
        {/* Glowing gold line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        {/* Bright center pip */}
        <div className="w-3 h-3 rounded-full bg-primary/60 shadow-[0_0_12px_rgba(201,168,76,0.5)] relative z-10" />
        {/* Wider glow behind line */}
        <div className="absolute inset-y-0 w-8 -translate-x-1/2 left-1/2 bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent blur-sm" />
      </div>

      {/* ── RIGHT: Login Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.03),transparent_60%)]" />

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">R</span>
              </div>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Roastery</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Sign in to your dashboard to manage orders, inventory, and operations.
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex-1 h-px bg-card-border/30" />
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
              Secured by Supabase
            </p>
            <div className="flex-1 h-px bg-card-border/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
