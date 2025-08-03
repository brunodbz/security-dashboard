export interface User {
  id: string;
  username: string;
  role: 'admin' | 'gestor' | 'analista';
}

export interface SecurityEvent {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  timestamp: Date;
}

export interface DashboardData {
  events: {
    elastic: SecurityEvent[];
    trellix: SecurityEvent[];
    defender: SecurityEvent[];
    tenable: SecurityEvent[];
  };
  indicators: {
    assets: number;
    exposureScore: number;
    vulnerabilities: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    recentEvents: number;
  };
}

export interface AuditLog {
  id: string;
  userId: {
    _id: string;
    username: string;
    role: string;
  };
  action: string;
  details: string;
  timestamp: Date;
}