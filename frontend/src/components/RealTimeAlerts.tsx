// frontend/src/components/RealTimeAlerts.tsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { formatDateTime } from '../utils/dateUtils';

interface Alert {
  id: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
}

const RealTimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulação de alertas em tempo real
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de novo alerta
        const severities: ('critical' | 'high' | 'medium' | 'low')[] = ['critical', 'high', 'medium', 'low'];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        
        const newAlert: Alert = {
          id: Math.random().toString(36).substring(7),
          message: `Novo alerta ${randomSeverity} detectado no sistema`,
          severity: randomSeverity,
          timestamp: new Date()
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
        
        // Enviar alerta para o backend (simulação)
        if (randomSeverity === 'critical') {
          api.post('/alerts/critical', { message: newAlert.message });
        }
      }
    }, 10000); // Verificar a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-700';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-500 text-green-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className={`mb-6 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">Alertas em Tempo Real</h3>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {isVisible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      
      <div className="space-y-2">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`border-l-4 p-4 rounded ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex justify-between">
              <p>{alert.message}</p>
              <span className="text-sm">{formatDateTime(alert.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeAlerts;