'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  Coffee, Box, Plus, Minus, Trash2, ShoppingBag,
  User, Hash, Loader2, Check, Sparkles
} from 'lucide-react'

type MenuItem = {
  id: string
  name: string
  price: string
  category: string
}

type CartItem = MenuItem & { qty: number }

export default function NewOrderForm({ menuItems }: { menuItems: MenuItem[] }) {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout'>('dine-in')
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showTableDropdown, setShowTableDropdown] = useState(false)

  const [isPlacing, setIsPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)
  const router = useRouter()

  const categories = [...new Set(menuItems.map(i => i.category))]



  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })

  }

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev
      .map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c)
      .filter(c => c.qty > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '').replace('₹', ''))
    return sum + price * item.qty
  }, 0)

  const itemsSummary = cart.map(c => `${c.name} x${c.qty}`).join(', ')

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return
    setIsPlacing(true)

    const id = orderType === 'dine-in' 
      ? `T${tableNumber.replace('Table ', '') || Math.floor(Math.random() * 100)}` 
      : `TO${Math.floor(Math.random() * 100)}`
    
    const customer = orderType === 'dine-in'
      ? `${tableNumber.startsWith('Table') ? tableNumber : `Table ${tableNumber}`}${customerName ? ` (${customerName})` : ''}`
      : customerName ? `Takeout (${customerName})` : 'Takeout'

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
      console.error('Error placing order:', error)
      setIsPlacing(false)
      return
    }

    // Also update tables table if it's a dine-in order
    if (orderType === 'dine-in') {
      const { error: tableError } = await supabase
        .from('tables')
        .upsert({
          id,
          name: `Table ${tableNumber}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          guests: 2 // Defaulting to 2 guests
        })

      if (tableError) {
        console.error('Error updating table:', tableError)
      }
    }

    setIsPlacing(false)
    setPlaced(true)

    setTimeout(() => {
      router.push('/orders')
      router.refresh()
    }, 1500)
  }

  const label = orderType === 'dine-in'
    ? `Table ${tableNumber || '—'}`
    : customerName || 'Takeout'

  if (placed) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 animate-in fade-in">
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center">
          <Check size={40} strokeWidth={1.5} className="text-emerald-500" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Order Placed!</h2>
          <p className="text-muted-foreground mt-2">
            {itemsSummary} — redirecting to orders...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

      {/* ── LEFT: Order Builder ── */}
      <div className="lg:col-span-3">
        <div className="bg-card/50 backdrop-blur-md border border-card-border/50 rounded-3xl shadow-lg shadow-black/20 overflow-hidden">

          {/* ─ Order Type ─ */}
          <div className="p-5">
            <h3 className="text-[13px] font-bold text-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Order Type
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`relative p-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-300 group ${
                  orderType === 'dine-in'
                    ? 'border-primary bg-primary/5'
                    : 'border-card-border/50 hover:border-card-border hover:bg-accent/20'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  orderType === 'dine-in' ? 'bg-primary/15 text-primary' : 'bg-accent/50 text-muted-foreground group-hover:text-foreground'
                }`}>
                  <Coffee size={18} strokeWidth={1.5} />
                </div>
                <span className={`font-bold text-xs tracking-wide ${orderType === 'dine-in' ? 'text-primary' : 'text-muted-foreground'}`}>
                  DINE-IN
                </span>

              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeout')}
                className={`relative p-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-300 group ${
                  orderType === 'takeout'
                    ? 'border-primary bg-primary/5'
                    : 'border-card-border/50 hover:border-card-border hover:bg-accent/20'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  orderType === 'takeout' ? 'bg-primary/15 text-primary' : 'bg-accent/50 text-muted-foreground group-hover:text-foreground'
                }`}>
                  <Box size={18} strokeWidth={1.5} />
                </div>
                <span className={`font-bold text-xs tracking-wide ${orderType === 'takeout' ? 'text-primary' : 'text-muted-foreground'}`}>
                  TAKEOUT
                </span>

              </button>
            </div>
          </div>

          <div className="h-px bg-card-border/30 mx-5" />

          {/* ─ Customer Details ─ */}
          <div className="p-5">
            <h3 className="text-[13px] font-bold text-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Customer Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {orderType === 'dine-in' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Table Number</label>
                  <div className="relative">
                    <Hash size={15} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value.replace(/\D/g, ''))}
                      onFocus={() => setShowTableDropdown(true)}
                      onBlur={() => setTimeout(() => setShowTableDropdown(false), 200)}
                      placeholder="e.g. 4"
                      className="w-full bg-accent/20 border border-card-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono"
                    />
                    
                    {/* Table Dropdown */}
                    {showTableDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-full bg-card/95 backdrop-blur-md border border-card-border/50 rounded-xl p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                        <div className="grid grid-cols-4 gap-2">
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                            <button
                              key={num}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault()
                                setTableNumber(`Table ${num}`)
                                setShowTableDropdown(false)
                              }}
                              className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                                tableNumber === `Table ${num}`
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-accent/50 text-foreground hover:bg-accent hover:text-primary border border-card-border/30'
                              }`}
                            >
                              T{num}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className={`flex flex-col gap-1.5 ${orderType === 'dine-in' ? '' : 'col-span-2'}`}>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Customer Name</label>
                <div className="relative">
                  <User size={15} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={orderType === 'dine-in' ? 'Optional' : 'e.g. Sarah'}
                    className="w-full bg-accent/20 border border-card-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-card-border/30 mx-5" />

          {/* ─ Add Items (Inline Grid) ─ */}
          <div className="p-5">
            <h3 className="text-[13px] font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Menu — tap to add
            </h3>

            <div className="flex flex-col gap-6">
              {categories.map(cat => {
                const items = menuItems.filter(i => i.category === cat)
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{cat}</span>
                      <div className="flex-1 h-px bg-card-border/20" />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {items.map(item => {
                        const inCart = cart.find(c => c.id === item.id)
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => addToCart(item)}
                            className={`relative flex flex-col items-start p-3.5 rounded-xl border backdrop-blur-sm transition-all duration-300 active:scale-[0.97] group ${
                              inCart
                                ? 'bg-card/30 border-primary shadow-[0_0_15px_rgba(201,168,76,0.15)]'
                                : 'bg-card/30 border-card-border/30 hover:border-card-border/60 hover:bg-card/50'
                            }`}
                          >
                            <div className="flex justify-between items-start w-full mb-2 gap-1">
                              <span className={`font-bold text-sm leading-tight transition-colors text-left ${inCart ? 'text-primary' : 'text-foreground group-hover:text-foreground'}`}>
                                {item.name}
                              </span>
                              <span className="text-xs font-mono text-primary font-semibold shrink-0">
                                {item.price}
                              </span>
                            </div>
                            
                            {/* Bottom row: Add indicator or quantity */}
                            <div className="flex justify-between items-center w-full mt-auto pt-1">
                              <span className="text-[9px] text-muted-foreground/60 uppercase tracking-widest font-bold">
                                {item.category}
                              </span>
                              
                              {inCart ? (
                                <div className="flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                  <ShoppingBag size={8} strokeWidth={2} />
                                  <span>{inCart.qty}</span>
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-accent/50 border border-card-border/40 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
                                  <Plus size={10} strokeWidth={2} />
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Order Summary ── */}
      <div className="lg:col-span-2">
        <div className="sticky top-8 bg-card/50 backdrop-blur-md border border-card-border/50 rounded-3xl p-6 shadow-lg shadow-black/20 flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles size={18} strokeWidth={1.5} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Order Summary</h3>
              <p className="text-xs text-muted-foreground font-mono">
                {orderType === 'dine-in' ? `Dine-in · Table ${tableNumber || '—'}` : `Takeout · ${customerName || '—'}`}
              </p>
            </div>
          </div>

          <div className="h-px bg-card-border/50" />

          {/* Item List with controls */}
          {cart.length > 0 ? (
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-accent/10 rounded-lg px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      ₹{(parseFloat(item.price.replace('$', '').replace('₹', '')) * item.qty).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-2 shrink-0">
                    <button type="button" onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-md bg-accent/50 border border-card-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                      <Minus size={11} strokeWidth={1.5} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-foreground font-mono">{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-md bg-accent/50 border border-card-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                      <Plus size={11} strokeWidth={1.5} />
                    </button>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={11} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center gap-2 text-muted-foreground/40">
              <ShoppingBag size={24} strokeWidth={1} />
              <p className="text-xs">Tap menu items to add</p>
            </div>
          )}

          <div className="h-px bg-card-border/50" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total</span>
            <span className="text-2xl font-bold text-primary font-mono">₹{total.toFixed(2)}</span>
          </div>

          {/* Place Order Button */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={cart.length === 0 || isPlacing}
            className="relative overflow-hidden w-full bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-4 rounded-2xl font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(201,168,76,0.25)] hover:shadow-[0_0_35px_rgba(201,168,76,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_250%] bg-[position:200%_0] bg-no-repeat group-hover:bg-[position:-100%_0] transition-[background-position] duration-700" />
            {isPlacing ? (
              <Loader2 size={18} strokeWidth={1.5} className="animate-spin relative z-10" />
            ) : (
              <ShoppingBag size={18} strokeWidth={1.5} className="relative z-10" />
            )}
            <span className="relative z-10">{isPlacing ? 'PLACING ORDER...' : 'PLACE ORDER'}</span>
          </button>

          <p className="text-[10px] text-muted-foreground/40 text-center uppercase tracking-widest">
            Order will appear in the live queue
          </p>
        </div>
      </div>
    </div>
  )
}
