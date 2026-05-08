'use client'

import { useState } from 'react'
import { LogIn, UserPlus, Mail, Lock, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setPending(true)
    const supabase = createSupabaseBrowserClient()

    if (isSignUp) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        setPending(false)
        return
      }

      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        setError(error.message)
      } else {
        setSuccess('Account created! You can now sign in.')
        setTimeout(() => setIsSignUp(false), 1500)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError('Invalid email or password.')
      } else {
        setSuccess('Authenticated! Redirecting...')
        router.push('/')
        router.refresh()
        return
      }
    }

    setPending(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">E-mail</label>
          <div className="relative group">
            <Mail size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-accent/40 border border-card-border/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/25 focus:bg-accent/60 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
          <div className="relative group">
            <Lock size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={isSignUp ? 'Min. 6 characters' : '••••••••'}
              className="w-full bg-accent/40 border border-card-border/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/25 focus:bg-accent/60 transition-all"
            />
          </div>
        </div>

        {/* Error / Success messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-2.5 px-4 rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm py-2.5 px-4 rounded-xl">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="relative overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_25px_rgba(201,168,76,0.25)] hover:shadow-[0_0_35px_rgba(201,168,76,0.4)] disabled:opacity-50 disabled:cursor-not-allowed tracking-wider mt-1 group active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.12)_50%,transparent_75%)] bg-[length:250%_250%] bg-[position:200%_0] bg-no-repeat group-hover:bg-[position:-100%_0] transition-[background-position] duration-700" />
          {pending ? (
            <Loader2 size={17} strokeWidth={1.5} className="animate-spin relative z-10" />
          ) : isSignUp ? (
            <UserPlus size={17} strokeWidth={1.5} className="relative z-10" />
          ) : (
            <LogIn size={17} strokeWidth={1.5} className="relative z-10" />
          )}
          <span className="relative z-10">{pending ? 'Please wait...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
        </button>
      </form>

      {/* Toggle */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => { setIsSignUp(!isSignUp); setError(null); setSuccess(null) }}
          className="text-primary font-semibold hover:underline underline-offset-2"
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
