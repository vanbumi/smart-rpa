'use client';

import React from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Receipt } from 'lucide-react';
import { CashFlowChart } from '@/components/charts';

const cashFlowData = [
  { day: 'Sen', inflow: 30000000, outflow: 21500000 },
  { day: 'Sel', inflow: 27000000, outflow: 19800000 },
  { day: 'Rab', inflow: 33000000, outflow: 23800000 },
  { day: 'Kam', inflow: 29000000, outflow: 20900000 },
  { day: 'Jum', inflow: 35000000, outflow: 25200000 },
  { day: 'Sab', inflow: 31000000, outflow: 22300000 },
  { day: 'Min', inflow: 32000000, outflow: 22900000 },
];

const hppBreakdown = [
  { item: 'Pembelian Ayam Hidup', amount: 15400000, percentage: 71.96 },
  { item: 'Tenaga Kerja', amount: 2400000, percentage: 11.21 },
  { item: 'Listrik & Air', amount: 1500000, percentage: 7.01 },
  { item: 'Bahan Pembantu', amount: 900000, percentage: 4.21 },
  { item: 'Transportasi', amount: 700000, percentage: 3.27 },
  { item: 'Depresiasi Alat', amount: 500000, percentage: 2.34 },
];

export function FinanceView() {
  const totalInflow = cashFlowData.reduce((sum, d) => sum + d.inflow, 0);
  const totalOutflow = cashFlowData.reduce((sum, d) => sum + d.outflow, 0);
  const netCash = totalInflow - totalOutflow;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Keuangan</h1>
        <p className="text-sm text-muted-foreground mt-1">Laporan keuangan dan arus kas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <ArrowUpCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pemasukan (7 Hari)</p>
              <p className="text-xl font-bold text-emerald-600">Rp {(totalInflow / 1000000).toFixed(0)} Jt</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <ArrowDownCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pengeluaran (7 Hari)</p>
              <p className="text-xl font-bold text-rose-600">Rp {(totalOutflow / 1000000).toFixed(0)} Jt</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Arus Kas Bersih (7 Hari)</p>
              <p className="text-xl font-bold text-primary">Rp {(netCash / 1000000).toFixed(0)} Jt</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Rincian HPP (Harga Pokok Penjualan)
          </h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm font-semibold text-foreground">Komponen</span>
              <span className="text-sm font-semibold text-foreground">Jumlah</span>
            </div>
            {hppBreakdown.map((item) => (
              <div key={item.item} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{item.item}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">Rp {item.amount.toLocaleString('id-ID')}</span>
                  <span className="text-xs text-muted-foreground ml-1.5">({item.percentage}%)</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-1 border-t-2 border-primary/20">
              <span className="text-sm font-bold text-foreground">Total HPP</span>
              <span className="text-base font-bold text-primary">Rp 21.400.000</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Arus Kas: Pemasukan vs Pengeluaran
          </h3>
          <CashFlowChart data={cashFlowData} />
        </div>
      </div>
    </div>
  );
}
