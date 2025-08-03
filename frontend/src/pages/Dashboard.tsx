// frontend/src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { SecurityEvent, DashboardData } from '../types';
import IndicatorCard from '../components/IndicatorCard';
import EventsTable from '../components/EventsTable';
import VulnerabilityChart from '../components/VulnerabilityChart';
import EventsTimeline from '../components/EventsTimeline';
import RealTimeAlerts from '../components/RealTimeAlerts';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Carregando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Segurança Corporativa</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Bem-vindo, {user?.username} ({user?.role})</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'events', 'vulnerabilities', 'audit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'Visão Geral'}
                {tab === 'events' && 'Eventos de Segurança'}
                {tab === 'vulnerabilities' && 'Vulnerabilidades'}
                {tab === 'audit' && 'Auditoria'}
              </button>
            ))}
          </nav>
        </div>

        {/* Alertas em tempo real */}
        <RealTimeAlerts />

        {/* Conteúdo baseado na aba ativa */}
        {activeTab === 'overview' && dashboardData && (
          <div>
            {/* Indicadores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <IndicatorCard
                title="Total de Ativos"
                value={dashboardData.indicators.assets}
                icon="🖥️"
                description="Dispositivos monitorados"
              />
              <IndicatorCard
                title="Score de Exposição"
                value={dashboardData.indicators.exposureScore}
                icon="📊"
                description="Média de risco"
                isScore
              />
              <IndicatorCard
                title="Eventos Recentes"
                value={dashboardData.indicators.recentEvents}
                icon="⚠️"
                description="Últimas 24 horas"
              />
              <IndicatorCard
                title="Vulnerabilidades Críticas"
                value={dashboardData.indicators.vulnerabilities.critical}
                icon="🚨"
                description="Requerem ação imediata"
              />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <VulnerabilityChart data={dashboardData.indicators.vulnerabilities} />
              <EventsTimeline events={[...dashboardData.events.elastic, ...dashboardData.events.defender].slice(0, 10)} />
            </div>

            {/* Tabelas de eventos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EventsTable title="Eventos Elastic" events={dashboardData.events.elastic} />
              <EventsTable title="Eventos Trellix" events={dashboardData.events.trellix} />
              <EventsTable title="Eventos Microsoft Defender" events={dashboardData.events.defender} />
              <EventsTable title="Eventos Tenable" events={dashboardData.events.tenable} />
            </div>
          </div>
        )}

        {activeTab === 'events' && dashboardData && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Todos os Eventos de Segurança</h2>
            <EventsTable 
              title="Eventos Consolidados" 
              events={[
                ...dashboardData.events.elastic,
                ...dashboardData.events.trellix,
                ...dashboardData.events.defender,
                ...dashboardData.events.tenable
              ]} 
              showAll
            />
          </div>
        )}

        {activeTab === 'vulnerabilities' && dashboardData && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Análise de Vulnerabilidades</h2>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <VulnerabilityChart data={dashboardData.indicators.vulnerabilities} detailed />
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Logs de Auditoria</h2>
            <AuditLogTable />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;