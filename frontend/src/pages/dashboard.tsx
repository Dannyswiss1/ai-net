// src/pages/dashboard.tsx
import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useNetworkStats } from '../hooks/useNetworkStats';
import { useToast } from '../context/ToastContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { KpiCard } from '../components/dashboard/KpiCard';
import { NetworkHealthBadge } from '../components/dashboard/NetworkHealthBadge';
import { RecentTasksTable } from '../components/dashboard/RecentTasksTable';
import styles from './dashboard.module.css';
import type { TimePoint } from '../types/api';

// Extract just the y-values from a 24h TimePoint[] series, falling back to a
// deterministic synthetic series shaped around the current value.
const toSeries = (points: TimePoint[] | undefined): number[] => {
  if (points && points.length > 0) {
    return points.map((p) => p.value);
  }
  return [];
};

const syntheticSeries = (value: number): number[] => {
  const base = Math.max(value, 1);
  return Array.from({ length: 24 }, (_, i) => {
    const wave = Math.sin(i / 2) * base * 0.12;
    const drift = (i / 23) * base * 0.3;
    return Math.max(0, Math.round(drift + wave + 1));
  });
};

export const DashboardPage: React.FC = () => {
  const { address } = useWallet();
  const { data, loading, error } = useNetworkStats();
  const { showToast } = useToast();

  // Show error toast when network stats fetch fails
  React.useEffect(() => {
    if (error) {
      showToast(`Failed to load network stats: ${error}`, 'error');
    }
  }, [error, showToast]);

  // Redirect unauthenticated users
  React.useEffect(() => {
    if (!address) {
      window.location.replace('/');
    }
  }, [address]);

  if (!address) return null; // render nothing while redirecting

  const kpiData = data || {
    totalAgents: 0,
    totalTasks: 0,
    totalXLMTransacted: 0,
    uptimePercent: 0,
  };

  const agentsSeries = toSeries(kpiData.tasksLast24h).length > 0 ? toSeries(kpiData.tasksLast24h) : syntheticSeries(kpiData.totalAgents);
  const tasksSeries = toSeries(kpiData.tasksLast24h).length > 0 ? toSeries(kpiData.tasksLast24h) : syntheticSeries(kpiData.totalTasks);
  const xlmSeries = toSeries(kpiData.xlmLast24h).length > 0 ? toSeries(kpiData.xlmLast24h) : syntheticSeries(kpiData.totalXLMTransacted);
  const uptimeSeries = toSeries(kpiData.tasksLast24h).length > 0 ? toSeries(kpiData.tasksLast24h) : syntheticSeries(Math.round(kpiData.uptimePercent));

  return (
    <DashboardLayout>
      <section className={styles.kpis}>
        <KpiCard title="Total Agents" value={kpiData.totalAgents} sparklineData={agentsSeries} loading={loading} />
        <KpiCard title="Total Tasks Run" value={kpiData.totalTasks} sparklineData={tasksSeries} loading={loading} />
        <KpiCard title="Total XLM Transacted" value={kpiData.totalXLMTransacted} sparklineData={xlmSeries} loading={loading} />
        <KpiCard title="Network Uptime" value={`${kpiData.uptimePercent.toFixed(2)}%`} sparklineData={uptimeSeries} loading={loading} />
      </section>
      <section className={styles.health}>
        <NetworkHealthBadge uptimePercent={kpiData.uptimePercent} />
      </section>
      <section className={styles.recentTasks}>
        <h2 className={styles.heading}>Recent Tasks</h2>
        <RecentTasksTable walletAddress={address} loading={loading} />
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;