'use server'

import { createSupabaseServerClient } from '@/lib/supabase-server'

type OrderData = {
  orderType: 'dine-in' | 'takeout'
  tableNumber: string
  customerName: string
  itemsSummary: string
}

export async function createOrderAction(data: OrderData) {
  const { orderType, tableNumber, customerName, itemsSummary } = data

  // Validation
  if (!itemsSummary) {
    return { error: 'Order must contain items.' }
  }

  if (orderType === 'dine-in' && !tableNumber) {
    return { error: 'Table number is required for dine-in orders.' }
  }

  try {
    const supabase = await createSupabaseServerClient()

    // Verify user identity from session (Fix 4.2)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized. Please log in to place an order.' }
    }

    const id = orderType === 'dine-in' 
      ? `T${tableNumber.replace('Table ', '') || Math.floor(Math.random() * 100)}` 
      : `TO${Math.floor(Math.random() * 100)}`
    
    // Derive identity from session: append user's email to customer field for audit
    const customer = orderType === 'dine-in'
      ? `${tableNumber.startsWith('Table') ? tableNumber : `Table ${tableNumber}`}${customerName ? ` (${customerName})` : ''} [by ${user.email}]`
      : customerName ? `Takeout (${customerName}) [by ${user.email}]` : `Takeout [by ${user.email}]`

    const { error } = await supabase
      .from('orders')
      .insert({
        id,
        customer_name: customer,
        items: itemsSummary,
        status: 'Waiting',
        color: 'bg-orange-500/20 text-orange-500'
      })

    if (error) {
      return { error: error.message }
    }

    // Also update tables table if it's a dine-in order
    if (orderType === 'dine-in') {
      const { error: tableError } = await supabase
        .from('tables')
        .upsert({
          id,
          name: tableNumber.startsWith('Table') ? tableNumber : `Table ${tableNumber}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          guests: 2 // Defaulting to 2 guests
        })

      if (tableError) {
        console.error('Error updating table:', tableError)
      }
    }

    return { success: true }
  } catch (e: any) {
    return { error: e?.message || 'Something went wrong.' }
  }
}
