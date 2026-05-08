'use server'

import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please fill in all fields.' }
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: error.message || 'Invalid email or password.' }
    }

    return { success: 'Authenticated! Redirecting...' }
  } catch (e: any) {
    return { error: e?.message || 'Something went wrong.' }
  }
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please fill in all fields.' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' }
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      return { error: error.message }
    }

    return { success: 'Account created! You can now sign in.' }
  } catch (e: any) {
    return { error: e?.message || 'Something went wrong.' }
  }
}

export async function logout() {
  try {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  } catch {
    // ignore
  }
}
