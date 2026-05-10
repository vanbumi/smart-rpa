'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

const NAVY = '#1a365d';
const NAVY_LIGHT = '#2a4a7f';
const EMERALD = '#059669';
const EMERALD_LIGHT = '#34d399';
const AMBER = '#f59e0b';
const ROSE = '#e11d48';
const SLATE = '#64748b';

const chartTooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  padding: '8px 12px',
};

interface SalesTrendChartProps {
  data: { day: string; pendapatan: number }[];
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={EMERALD} stopOpacity={0.3} />
            <stop offset="95%" stopColor={EMERALD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
        />
        <Area type="monotone" dataKey="pendapatan" stroke={EMERALD} strokeWidth={2.5} fill="url(#salesGradient)" dot={{ r: 4, fill: EMERALD, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: EMERALD, stroke: '#fff', strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface TargetVsActualChartProps {
  data: { day: string; target: number; realisasi: number }[];
}

export function TargetVsActualChart({ data }: TargetVsActualChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
        <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value} Kg`, '']} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="target" fill={NAVY_LIGHT} radius={[6, 6, 0, 0]} name="Target" barSize={20} />
        <Bar dataKey="realisasi" fill={EMERALD} radius={[6, 6, 0, 0]} name="Realisasi" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value} Kg`, '']} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface ArAgingChartProps {
  data: { range: string; amount: number }[];
}

export function ArAgingChart({ data }: ArAgingChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
        <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Piutang']} />
        <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={36}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={[EMERALD, AMBER, NAVY_LIGHT, ROSE][index] || SLATE} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface MortalityChartProps {
  data: { day: string; rate: number }[];
}

export function MortalityChart({ data }: MortalityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="mortalityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={ROSE} stopOpacity={0.2} />
            <stop offset="95%" stopColor={ROSE} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 2]} tickFormatter={(v) => `${v}%`} />
        <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}%`, 'Mortalitas DOA']} />
        <Area type="monotone" dataKey="rate" stroke={ROSE} strokeWidth={2.5} fill="url(#mortalityGradient)" dot={{ r: 4, fill: ROSE, strokeWidth: 2, stroke: '#fff' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface CashFlowChartProps {
  data: { day: string; inflow: number; outflow: number }[];
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={EMERALD} stopOpacity={0.25} />
            <stop offset="95%" stopColor={EMERALD} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={NAVY} stopOpacity={0.25} />
            <stop offset="95%" stopColor={NAVY} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
        <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, '']} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="inflow" stroke={EMERALD} strokeWidth={2} fill="url(#inflowGradient)" name="Pemasukan" dot={{ r: 3, fill: EMERALD }} />
        <Area type="monotone" dataKey="outflow" stroke={NAVY} strokeWidth={2} fill="url(#outflowGradient)" name="Pengeluaran" dot={{ r: 3, fill: NAVY }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
