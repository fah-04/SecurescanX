import React from 'react';
import { ScanResultType } from '../types/scanner';
import { AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

interface ScanResultsProps {
  results: ScanResultType[];
  onSelectVulnerability: (id: string) => void;
  selectedVulnerabilityId: string | null;
}

export const ScanResults: React.FC<ScanResultsProps> = ({ 
  results, 
  onSelectVulnerability,
  selectedVulnerabilityId
}) => {
  const criticalCount = results.filter(r => r.severity === 'critical').length;
  const highCount = results.filter(r => r.severity === 'high').length;
  const mediumCount = results.filter(r => r.severity === 'medium').length;
  const lowCount = results.filter(r => r.severity === 'low').length;
  const passedCount = results.filter(r => r.severity === 'none').length;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Scan Results</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <StatCard icon={<XCircle className="h-5 w-5 text-red-500" />} count={criticalCount} label="Critical" color="bg-red-500/10 border-red-500/20" />
        <StatCard icon={<AlertTriangle className="h-5 w-5 text-orange-500" />} count={highCount} label="High" color="bg-orange-500/10 border-orange-500/20" />
        <StatCard icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />} count={mediumCount} label="Medium" color="bg-yellow-500/10 border-yellow-500/20" />
        <StatCard icon={<AlertTriangle className="h-5 w-5 text-blue-500" />} count={lowCount} label="Low" color="bg-blue-500/10 border-blue-500/20" />
        <StatCard icon={<CheckCircle className="h-5 w-5 text-green-500" />} count={passedCount} label="Passed" color="bg-green-500/10 border-green-500/20" />
      </div>
      
      <div className="space-y-3">
        {results.map((result) => (
          <div 
            key={result.id}
            onClick={() => onSelectVulnerability(result.id)}
            className={`p-4 rounded-md border backdrop-blur-md transition-all cursor-pointer ${
              selectedVulnerabilityId === result.id
                ? 'border-red-500/50 bg-red-500/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getSeverityIcon(result.severity)}
                <div>
                  <h3 className="font-medium text-white">{result.title}</h3>
                  <p className="text-sm text-slate-300">{result.description.substring(0, 100)}...</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded ${getSeverityClass(result.severity)}`}>
                  {result.severity.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>OWASP Category: {result.category}</span>
              </div>
              <div className="mt-1">
                <span>Line: {result.line}</span>
              </div>
            </div>
          </div>
        ))}
        
        {results.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            No vulnerabilities found.
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, count, label, color }) => (
  <div className={`p-3 rounded-md border backdrop-blur-md ${color} text-center`}>
    <div className="flex justify-center mb-1">
      {icon}
    </div>
    <div className="font-bold text-lg text-white">{count}</div>
    <div className="text-xs text-slate-300">{label}</div>
  </div>
);

const getSeverityIcon = (severity: string) => {
  switch(severity) {
    case 'critical':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'medium':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'low':
      return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    case 'none':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-slate-500" />;
  }
};

const getSeverityClass = (severity: string) => {
  switch(severity) {
    case 'critical':
      return 'bg-red-500/20 text-red-400';
    case 'high':
      return 'bg-orange-500/20 text-orange-400';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'low':
      return 'bg-blue-500/20 text-blue-400';
    case 'none':
      return 'bg-green-500/20 text-green-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};