import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { WalletProvider } from './context/WalletContext'
import { ToastProvider } from './context/ToastContext'
import { NotFoundPage } from './pages/NotFoundPage';
import AppShell from './components/layout/AppShell'
import LandingPage from './pages/LandingPage'
import AgentsPage from './pages/AgentsPage'
import NewTaskPage from './pages/tasks/NewTaskPage'
import TaskDetailPage from './pages/TaskDetailPage'
import RendererDemoPage from './pages/RendererDemoPage'
import WalletPage from './pages/WalletPage'
import DashboardPage from './pages/dashboard'
import ErrorBoundary from './components/common/ErrorBoundary'
import './components/common/Toast.css'

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={
          <AppShell>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/tasks/new" element={<NewTaskPage />} />
              <Route path="/tasks/:id" element={<TaskDetailPage />} />
              <Route path="/renderer-demo" element={<RendererDemoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <WalletProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </WalletProvider>
      </ErrorBoundary>
    </I18nextProvider>
  )
}

export default App
