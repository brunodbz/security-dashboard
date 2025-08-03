import React from 'react';
import { SecurityEvent } from '../types';
import { formatDateTime } from '../utils/dateUtils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EventsTimelineProps {
  events: SecurityEvent[];
}

const EventsTimeline: React.FC<EventsTimelineProps> = ({ events }) => {
  // Preparar dados para o gráfico
  const chartData = events.map(event => ({
    name: event.type,
    timestamp: formatDateTime(event.timestamp),
    severity: event.severity,
    description: event.description
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F97316';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Linha do Tempo de Eventos</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip 
              formatter={(value, name, props) => [props.payload.description, 'Descrição']}
              labelFormatter={(label) => `Evento: ${label}`}
            />
            <Bar dataKey="timestamp" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EventsTimeline;