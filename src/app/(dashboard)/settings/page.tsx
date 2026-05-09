import { Settings, Bell, Mail, Shield, Smartphone, Globe } from "lucide-react";
import TopActions from "@/components/TopActions";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <header className="flex items-center justify-between py-8 border-b border-card-border/50 mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">Configure your cafe preferences and notifications.</p>
        </div>
        <TopActions />
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar Settings Nav */}
        <div className="flex flex-col gap-2 col-span-1">
          <button className="flex items-center gap-3 px-4 py-3 bg-accent/50 text-primary rounded-xl border border-card-border/50 font-medium text-sm transition-colors">
            <Bell size={18} strokeWidth={1.5} /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 text-muted-foreground hover:text-primary rounded-xl font-medium text-sm transition-colors">
            <Shield size={18} strokeWidth={1.5} /> Security & Auth
          </button>
          <button className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 text-muted-foreground hover:text-primary rounded-xl font-medium text-sm transition-colors">
            <Globe size={18} strokeWidth={1.5} /> Localization
          </button>
        </div>

        {/* Settings Content */}
        <div className="col-span-2 flex flex-col gap-8">
          
          <section className="bg-card border border-card-border/50 rounded-2xl p-6 shadow-lg shadow-black/20">
            <h2 className="text-lg font-semibold text-primary mb-6">Notification Preferences</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">In-App Notifications</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Receive alerts inside the dashboard for new orders.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted-foreground peer-checked:after:bg-primary-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-card-border/50"></div>
                </label>
              </div>

              <hr className="border-card-border/50" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Mail size={16} strokeWidth={1.5} className="text-muted-foreground" /> Email Alerts
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">Daily revenue summaries and critical alerts sent to admin.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted-foreground peer-checked:after:bg-primary-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-card-border/50"></div>
                </label>
              </div>

              <hr className="border-card-border/50" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Smartphone size={16} strokeWidth={1.5} className="text-muted-foreground" /> Push Notifications
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">Send alerts to the roastery floor iPads.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted-foreground peer-checked:after:bg-primary-foreground after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-card-border/50"></div>
                </label>
              </div>
            </div>
          </section>

          <section className="bg-card border border-card-border/50 rounded-2xl p-6 shadow-lg shadow-black/20">
            <h2 className="text-lg font-semibold text-primary mb-6">Dashboard Preferences</h2>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">Default View</label>
                <select className="w-full bg-background border border-card-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-primary text-primary transition-colors">
                  <option>Overview (Active Orders & Tables)</option>
                  <option>Active Orders Only</option>
                  <option>Kitchen Display System (KDS)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">Auto-refresh Interval</label>
                <select className="w-full bg-background border border-card-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-primary text-primary transition-colors">
                  <option>Live (Real-time)</option>
                  <option>Every 15 Seconds</option>
                  <option>Every 1 Minute</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button className="bg-primary text-primary-foreground font-medium py-2.5 px-6 rounded-xl hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30">
                Save Changes
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
