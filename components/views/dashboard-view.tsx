'use client';

import React from 'react';
import { Scale, DollarSign, Percent, Clock } from 'lucide-react';
import { KpiCard } from '@/components/kpi-card';
import { SalesTrendChart, TargetVsActualChart } from '@/components/charts';

const kpiData = [
  {
    title: 'Total Berat Masuk (Kg)',
    value: '4.400',
    change: '+2.3% dari kemarin',
    changeType: 'positive' as const,
    icon: Scale,
    iconColor: 'bg-[#1a365d]',
  },
  {
    title: 'Laba Bersih Harian',
    value: 'Rp 9.1 Jt',
    change: '+4.6% dari kemarin',
    changeType: 'positive' as const,
    icon: DollarSign,
    iconColor: 'bg-emerald-600',
  },
  {
    title: 'Persentase Rendemen',
    value: '73.5%',
    change: '+0.7% dari kemarin',
    changeType: 'positive' as const,
    icon: Percent,
    iconColor: 'bg-amber-500',
  },
  {
    title: 'Pesanan Menunggu',
    value: '4',
    change: '-2 dari kemarin',
    changeType: 'negative' as const,
    icon: Clock,
    iconColor: 'bg-rose-600',
  },
];

const salesTrendData = [
  { day: 'Sen', pendapatan: 28500000 },
  { day: 'Sel', pendapatan: 25600000 },
  { day: 'Rab', pendapatan: 31000000 },
  { day: 'Kam', pendapatan: 27800000 },
  { day: 'Jum', pendapatan: 32500000 },
  { day: 'Sab', pendapatan: 29200000 },
  { day: 'Min', pendapatan: 30500000 },
];

const targetVsActualData = [
  { day: 'Sen', target: 4500, realisasi: 4200 },
  { day: 'Sel', target: 4500, realisasi: 3800 },
  { day: 'Rab', target: 4500, realisasi: 4500 },
  { day: 'Kam', target: 4500, realisasi: 4100 },
  { day: 'Jum', target: 4500, realisasi: 4600 },
  { day: 'Sab', target: 4500, realisasi: 4300 },
  { day: 'Min', target: 4500, realisasi: 4400 },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dasbor Utama</h1>
        <p className="text-sm text-muted-foreground mt-1">Ringkasan performa RPA hari ini</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Tren Penjualan 7 Hari Terakhir</h3>
          <SalesTrendChart data={salesTrendData} />
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Target vs Realisasi Produksi</h3>
          <TargetVsActualChart data={targetVsActualData} />
        </div>
      </div>
    </div>
  );
}
