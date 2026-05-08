"use client";
import { useState, useEffect, useRef } from "react";
import { Bell, User, X, Coffee, AlertTriangle, Package, Clock } from "lucide-react";

type Notification = {
  id: number;
  icon: 'order' | 'stock' | 'reservation' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    icon: 'stock',
    title: 'Low Stock Alert',
    message: 'Oat Milk supply is running low — only 2 cartons remaining.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    icon: 'order',
    title: 'New Order Received',
    message: 'Table 7 — Cortado x2, Almond Croissant x1',
    time: '5 min ago',
    read: false,
  },
];

const INCOMING_NOTIFICATIONS: Omit<Notification, 'id' | 'read' | 'time'>[] = [
  { icon: 'stock', title: 'Out of Stock', message: 'Cinnamon Roll is now sold out for today.' },
  { icon: 'reservation', title: 'New Reservation', message: 'Window Booth reserved for 20:30 — 4 guests.' },
  { icon: 'order', title: 'Order Ready', message: 'Takeout order TO3 is ready for pickup.' },
  { icon: 'system', title: 'Peak Hour Approaching', message: 'Expect high volume between 18:00–19:00.' },
  { icon: 'stock', title: 'Low Stock Alert', message: 'Espresso beans down to last 500g bag.' },
  { icon: 'order', title: 'Table Cleared', message: 'Table 12 has been cleared and is available.' },
  { icon: 'reservation', title: 'Reservation Cancelled', message: 'Bar Seating 20:00 booking was cancelled.' },
  { icon: 'system', title: 'Daily Summary', message: '47 orders processed today. Revenue: ₹41,250.' },
];

function getTimeAgo(seconds: number): string {
  if (seconds < 60) return 'Just now';
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function NotifIcon({ type }: { type: Notification['icon'] }) {
  const base = "w-8 h-8 rounded-lg flex items-center justify-center shrink-0";
  switch (type) {
    case 'order':
      return <div className={`${base} bg-blue-500/10 text-blue-400`}><Coffee size={15} strokeWidth={1.5} /></div>;
    case 'stock':
      return <div className={`${base} bg-orange-500/10 text-orange-400`}><AlertTriangle size={15} strokeWidth={1.5} /></div>;
    case 'reservation':
      return <div className={`${base} bg-emerald-500/10 text-emerald-400`}><Clock size={15} strokeWidth={1.5} /></div>;
    case 'system':
      return <div className={`${base} bg-primary/10 text-primary`}><Package size={15} strokeWidth={1.5} /></div>;
  }
}

export default function TopActions() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const [incomingIdx, setIncomingIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Tick elapsed time every 30s to update "time ago" labels
  useEffect(() => {
    const t = setInterval(() => setElapsed(p => p + 30), 30000);
    return () => clearInterval(t);
  }, []);

  // Push a new notification every 20–40 seconds
  useEffect(() => {
    const delay = 20000 + Math.random() * 20000;
    const t = setTimeout(() => {
      const template = INCOMING_NOTIFICATIONS[incomingIdx % INCOMING_NOTIFICATIONS.length];
      setNotifications(prev => [{
        ...template,
        id: Date.now(),
        read: false,
        time: 'Just now',
      }, ...prev].slice(0, 20)); // keep max 20
      setIncomingIdx(p => p + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [incomingIdx]);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Mark all as read when opening
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const dismissNotif = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex items-center gap-4 shrink-0">
      {/* Notification Bell */}
      <div className="relative" ref={panelRef}>
        <button
          onClick={handleOpen}
          className="relative p-2 rounded-full hover:bg-accent/50 transition-colors text-muted-foreground hover:text-primary"
        >
          <Bell size={20} strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[9px] font-bold text-white border-2 border-background animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-3 w-96 bg-card border border-card-border/60 rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-card-border/40">
              <h3 className="font-bold text-foreground text-sm">Notifications</h3>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {notifications.length} total
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground/50 text-sm">
                  No notifications
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-5 py-3.5 border-b border-card-border/20 hover:bg-accent/30 transition-colors group ${
                      !n.read ? 'bg-accent/15' : ''
                    }`}
                  >
                    <NotifIcon type={n.icon} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] text-muted-foreground/50 mt-1 font-mono">{n.time}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); dismissNotif(n.id); }}
                      className="p-1 rounded-md text-muted-foreground/30 hover:text-foreground hover:bg-accent/50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-5 py-3 border-t border-card-border/40">
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs font-semibold text-primary hover:underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Avatar */}
      <button className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-primary hover:ring-2 ring-primary/20 transition-all border border-card-border/50 overflow-hidden shrink-0">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="User Profile" className="w-full h-full object-cover" />
      </button>
    </div>
  );
}
