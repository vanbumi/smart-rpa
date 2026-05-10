'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Truck, CheckCircle2, Clock, X } from 'lucide-react';
import { ArAgingChart } from '@/components/charts';

const orders = [
  { id: 'ORD-2026-001', customer: 'PT Segar Jaya', amount: 12500000, status: 'proses', date: '10 Mei 2026' },
  { id: 'ORD-2026-002', customer: 'Restoran Sederhana', amount: 8750000, status: 'dikirim', date: '9 Mei 2026' },
  { id: 'ORD-2026-003', customer: 'Hotel Grand Mercure', amount: 15200000, status: 'selesai', date: '5 Mei 2026' },
  { id: 'ORD-2026-004', customer: 'Warung Makan Bu Tini', amount: 3200000, status: 'menunggu', date: '10 Mei 2026' },
  { id: 'ORD-2026-005', customer: 'PT Dharma Catering', amount: 9800000, status: 'proses', date: '10 Mei 2026' },
  { id: 'ORD-2026-006', customer: 'Supermarket Indogrosir', amount: 22100000, status: 'dikirim', date: '8 Mei 2026' },
  { id: 'ORD-2026-007', customer: 'RM Padang Sederhana', amount: 6400000, status: 'selesai', date: '30 Apr 2026' },
  { id: 'ORD-2026-008', customer: 'PT Katering Nusantara', amount: 11500000, status: 'menunggu', date: '10 Mei 2026' },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  menunggu: { label: 'Menunggu', color: 'bg-amber-100 text-amber-800', icon: Clock },
  proses: { label: 'Proses', color: 'bg-blue-100 text-blue-800', icon: ShoppingCart },
  dikirim: { label: 'Dikirim', color: 'bg-emerald-100 text-emerald-800', icon: Truck },
  selesai: { label: 'Selesai', color: 'bg-slate-100 text-slate-700', icon: CheckCircle2 },
};

const arAgingData = [
  { range: '0-30 Hari', amount: 42100000 },
  { range: '31-60 Hari', amount: 22350000 },
  { range: '61-90 Hari', amount: 3200000 },
  { range: '>90 Hari', amount: 0 },
];

const piutangData = [
  { customer: 'PT Segar Jaya', total: 12500000, aging: '0-30 Hari' },
  { customer: 'Restoran Sederhana', total: 8750000, aging: '31-60 Hari' },
  { customer: 'Warung Makan Bu Tini', total: 3200000, aging: '61-90 Hari' },
  { customer: 'PT Dharma Catering', total: 9800000, aging: '0-30 Hari' },
  { customer: 'Supermarket Indogrosir', total: 22100000, aging: '0-30 Hari' },
  { customer: 'PT Katering Nusantara', total: 11500000, aging: '31-60 Hari' },
];

export function SalesView() {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [statusFilter, setStatusFilter] = useState('semua');

  const filteredOrders = statusFilter === 'semua' ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Penjualan & Distribusi</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola pesanan dan piutang pelanggan</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['semua', 'menunggu', 'proses', 'dikirim', 'selesai'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === s
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {s === 'semua' ? 'Semua' : statusConfig[s]?.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          return (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${config.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {config.label}
                </span>
              </div>
              <p className="font-semibold text-foreground text-sm">{order.customer}</p>
              <p className="text-lg font-bold text-foreground mt-1">Rp {order.amount.toLocaleString('id-ID')}</p>
              <p className="text-xs text-muted-foreground mt-2">{order.date}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Daftar Piutang</h3>
          <div className="space-y-3">
            {piutangData.map((item) => (
              <div key={item.customer} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.customer}</p>
                  <p className="text-xs text-muted-foreground">{item.aging}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">Rp {item.total.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Umur Piutang (AR Aging)</h3>
          <ArAgingChart data={arAgingData} />
        </div>
      </div>

      {showNewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Buat Pesanan Baru</h3>
              <button onClick={() => setShowNewOrder(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Nama Pelanggan</label>
                <input className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Masukkan nama pelanggan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Produk</label>
                <select className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Ayam Utuh</option>
                  <option>Sayap</option>
                  <option>Paha</option>
                  <option>Ceker</option>
                  <option>Jeroan</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Jumlah (Kg)</label>
                  <input type="number" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Tanggal Jatuh Tempo</label>
                  <input type="date" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                Buat Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowNewOrder(true)}
        className="fixed bottom-20 lg:bottom-6 right-6 z-30 flex items-center gap-2 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-lg hover:bg-emerald-700 transition-all hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm font-semibold">Buat Pesanan Baru</span>
      </button>
    </div>
  );
}
