'use client';

import React, { useState } from 'react';
import { Package, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import { DonutChart } from '@/components/charts';

const inventoryData = [
  { name: 'Ayam Utuh', category: 'utuh', weight: 2450, unit: 1200, price: 32000, color: '#1a365d' },
  { name: 'Sayap', category: 'sayap', weight: 680.5, unit: 3400, price: 45000, color: '#059669' },
  { name: 'Paha', category: 'paha', weight: 920, unit: 2800, price: 38000, color: '#2a4a7f' },
  { name: 'Ceker', category: 'ceker', weight: 310.25, unit: 5200, price: 28000, color: '#f59e0b' },
  { name: 'Jeroan', category: 'jeroan', weight: 185.75, unit: 1800, price: 22000, color: '#e11d48' },
];

const donutData = [
  { name: 'Ayam Utuh', value: 2450, color: '#1a365d' },
  { name: 'Sayap', value: 680, color: '#059669' },
  { name: 'Paha', value: 920, color: '#2a4a7f' },
  { name: 'Ceker', value: 310, color: '#f59e0b' },
  { name: 'Jeroan', value: 186, color: '#e11d48' },
];

export function InventoryView() {
  const [showConversion, setShowConversion] = useState(false);
  const [conversionForm, setConversionForm] = useState({
    liveWeight: '',
    birdCount: '',
    mortality: '',
    utuh: '',
    sayap: '',
    paha: '',
    ceker: '',
    jeroan: '',
  });

  const totalWeight = inventoryData.reduce((sum, item) => sum + item.weight, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Stok & Gudang</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola inventaris dan konversi produk</p>
        </div>
        <button
          onClick={() => setShowConversion(!showConversion)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Konversi
        </button>
      </div>

      {showConversion && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            Form Konversi: Ayam Hidup ke Bagian Olahan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Berat Ayam Hidup (Kg)</label>
              <input
                type="number"
                value={conversionForm.liveWeight}
                onChange={(e) => setConversionForm({ ...conversionForm, liveWeight: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Jumlah Ekor</label>
              <input
                type="number"
                value={conversionForm.birdCount}
                onChange={(e) => setConversionForm({ ...conversionForm, birdCount: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Mortalitas DOA (ekor)</label>
              <input
                type="number"
                value={conversionForm.mortality}
                onChange={(e) => setConversionForm({ ...conversionForm, mortality: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Ayam Utuh (Kg)</label>
              <input
                type="number"
                value={conversionForm.utuh}
                onChange={(e) => setConversionForm({ ...conversionForm, utuh: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Sayap (Kg)</label>
              <input
                type="number"
                value={conversionForm.sayap}
                onChange={(e) => setConversionForm({ ...conversionForm, sayap: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Paha (Kg)</label>
              <input
                type="number"
                value={conversionForm.paha}
                onChange={(e) => setConversionForm({ ...conversionForm, paha: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Ceker (Kg)</label>
              <input
                type="number"
                value={conversionForm.ceker}
                onChange={(e) => setConversionForm({ ...conversionForm, ceker: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Jeroan (Kg)</label>
              <input
                type="number"
                value={conversionForm.jeroan}
                onChange={(e) => setConversionForm({ ...conversionForm, jeroan: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">
                Simpan Konversi
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 pb-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Daftar Stok Gudang Frozen
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">Total: {totalWeight.toLocaleString('id-ID')} Kg</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t border-border bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-muted-foreground">Produk</th>
                  <th className="text-right px-6 py-3 font-semibold text-muted-foreground">Berat (Kg)</th>
                  <th className="text-right px-6 py-3 font-semibold text-muted-foreground">Unit</th>
                  <th className="text-right px-6 py-3 font-semibold text-muted-foreground">Harga/Kg</th>
                  <th className="text-right px-6 py-3 font-semibold text-muted-foreground">Nilai Stok</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.name} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-right px-6 py-3.5 font-mono text-foreground">{item.weight.toLocaleString('id-ID')}</td>
                    <td className="text-right px-6 py-3.5 font-mono text-foreground">{item.unit.toLocaleString('id-ID')}</td>
                    <td className="text-right px-6 py-3.5 font-mono text-foreground">Rp {item.price.toLocaleString('id-ID')}</td>
                    <td className="text-right px-6 py-3.5 font-mono font-semibold text-foreground">
                      Rp {(item.weight * item.price).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Komposisi Stok Gudang Frozen</h3>
          <DonutChart data={donutData} />
        </div>
      </div>
    </div>
  );
}
