'use client';

import React from 'react';
import { Factory, Trash2, Skull, Users, TrendingUp } from 'lucide-react';
import { MortalityChart } from '@/components/charts';

const mortalityData = [
  { day: 'Sen', rate: 1.2 },
  { day: 'Sel', rate: 1.5 },
  { day: 'Rab', rate: 0.8 },
  { day: 'Kam', rate: 1.1 },
  { day: 'Jum', rate: 0.6 },
  { day: 'Sab', rate: 0.9 },
  { day: 'Min', rate: 0.7 },
];

const wasteData = [
  { type: 'Bulu & Kulit', weight: 85, percentage: 26.6 },
  { type: 'Darah', weight: 65, percentage: 20.3 },
  { type: 'Kepala', weight: 55, percentage: 17.2 },
  { type: 'Lemak', weight: 45, percentage: 14.1 },
  { type: 'Tulang Rongsok', weight: 40, percentage: 12.5 },
  { type: 'Lainnya', weight: 30, percentage: 9.3 },
];

const teamPerformance = [
  { team: 'Tim Penyembelihan A', birds: 850, avgTime: 3.5, yield: 74.2, trend: 'up' },
  { team: 'Tim Penyembelihan B', birds: 780, avgTime: 3.8, yield: 72.8, trend: 'down' },
  { team: 'Tim Penyembelihan C', birds: 920, avgTime: 3.2, yield: 75.1, trend: 'up' },
];

export function ProductionView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Produksi & Operasional</h1>
        <p className="text-sm text-muted-foreground mt-1">Pantau performa produksi dan limbah</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Limbah Hari Ini</p>
              <p className="text-xl font-bold text-foreground">155 Kg</p>
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-semibold">-6.1% dari kemarin</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Skull className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mortalitas DOA</p>
              <p className="text-xl font-bold text-foreground">0.7%</p>
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-semibold">-0.2% dari kemarin</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Factory className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Diproses</p>
              <p className="text-xl font-bold text-foreground">2.550 ekor</p>
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-semibold">+5.2% dari kemarin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Skull className="w-5 h-5 text-rose-600" />
            Tren Mortalitas DOA (7 Hari)
          </h3>
          <MortalityChart data={mortalityData} />
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-amber-600" />
            Pelacakan Limbah
          </h3>
          <div className="space-y-3">
            {wasteData.map((item) => (
              <div key={item.type} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.type}</span>
                  <span className="text-muted-foreground">{item.weight} Kg ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Performa Tim Penyembelihan
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Tim</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Ekor Diproses</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Waktu Rata-rata (mnt)</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Rendemen (%)</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Tren</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((team) => (
                <tr key={team.team} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-foreground">{team.team}</td>
                  <td className="text-right px-4 py-3.5 font-mono text-foreground">{team.birds.toLocaleString('id-ID')}</td>
                  <td className="text-right px-4 py-3.5 font-mono text-foreground">{team.avgTime}</td>
                  <td className="text-right px-4 py-3.5">
                    <span className={`font-semibold ${team.yield >= 74 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {team.yield}%
                    </span>
                  </td>
                  <td className="text-center px-4 py-3.5">
                    <TrendingUp className={`w-4 h-4 inline-block ${team.trend === 'up' ? 'text-emerald-600' : 'text-rose-600 rotate-180'}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
