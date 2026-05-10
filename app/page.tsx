'use client';

import React, { useState } from 'react';
import { Sidebar, BottomNav } from '@/components/sidebar';
import { DashboardView } from '@/components/views/dashboard-view';
import { InventoryView } from '@/components/views/inventory-view';
import { SalesView } from '@/components/views/sales-view';
import { ProductionView } from '@/components/views/production-view';
import { FinanceView } from '@/components/views/finance-view';
import { cn } from '@/lib/utils';
import { Bell, Search, User } from 'lucide-react';

const viewMap: Record<string, React.ComponentType> = {
  dashboard: DashboardView,
  inventory: InventoryView,
  sales: SalesView,
  production: ProductionView,
  finance: FinanceView,
};

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const ActiveView = viewMap[activeView];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]')}>
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-14 px-4 lg:px-6">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari pesanan, stok, pelanggan..."
                  className="w-full rounded-xl border border-input bg-muted/50 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 rounded-full text-[9px] text-white font-bold flex items-center justify-center">3</span>
              </button>
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          <ActiveView />
        </main>
      </div>

      <BottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
}
