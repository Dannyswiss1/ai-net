// src/pages/dashboard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../hooks/useWallet';
import { useNetworkStats } from '../hooks/useNetworkStats';
import { useToast } from '../context/ToastContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { KpiCard } from '../components/dashboard/KpiCard';
import { NetworkHealthBadge } from '../components/dashboard/NetworkHealthBadge';
import { RecentTasksTable } from '../components/dashboard/RecentTasksTable';
import styles from './dashboard.module.css';

export const DashboardPage: React.FC = () => {
  const { address } = useWallet();
  const { data, loading, error } = useNetworkStats();
  const { showToast } = useToast();
  const { t, i18n } = useTranslation();

  // Show error toast when network stats fetch fails
  React.useEffect(() => {
    if (error) {
      // i18n.t so the toast uses the current language without re-running the
      // effect on every language change.
      showToast(i18n.t('page.dashboard.statsError', { error }), 'error');
    }
  }, [error, showToast, i18n]);

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

  const sparkline = [kpiData.totalAgents, kpiData.totalTasks, kpiData.totalXLMTransacted]; // placeholder data

  return (
    <DashboardLayout>
      <section className={styles.kpis}>
        <KpiCard title={t('page.dashboard.totalAgents')} value={kpiData.totalAgents} sparklineData={sparkline} loading={loading} />
        <KpiCard title={t('page.dashboard.totalTasks')} value={kpiData.totalTasks} sparklineData={sparkline} loading={loading} />
        <KpiCard title={t('page.dashboard.totalXLM')} value={kpiData.totalXLMTransacted} sparklineData={sparkline} loading={loading} />
        <KpiCard title={t('page.dashboard.uptime')} value={`${kpiData.uptimePercent.toFixed(2)}%`} sparklineData={sparkline} loading={loading} />
      </section>
      <section className={styles.health}>
        <NetworkHealthBadge uptimePercent={kpiData.uptimePercent} />
      </section>
      <section className={styles.recentTasks}>
        <h2 className={styles.heading}>{t('page.dashboard.recentTasks')}</h2>
        <RecentTasksTable walletAddress={address} loading={loading} />
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
