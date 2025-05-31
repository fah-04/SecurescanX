import React, { useState } from 'react';
import { CodeInput } from '../components/CodeInput';
import { ScanResults } from '../components/ScanResults';
import { VulnerabilityInfo } from '../components/VulnerabilityInfo';
import { scanCode } from '../utils/scanner';
import { ScanResultType } from '../types/scanner';
import { ShieldAlert } from 'lucide-react';

export const ScannerDashboard: React.FC = () => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState<ScanResultType[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  const handleScan = async () => {
    if (!code.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      const scanResults = scanCode(code);
      setResults(scanResults);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold text-white">OWASP Scanner</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <CodeInput code={code} onChange={setCode} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleScan}
                disabled={isScanning || !code.trim()}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  isScanning || !code.trim()
                    ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {isScanning ? 'Scanning...' : 'Scan Code'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ScanResults 
              results={results} 
              onSelectVulnerability={setSelectedVulnerability}
              selectedVulnerabilityId={selectedVulnerability}
            />
          </div>
          <div className="md:col-span-1">
            <VulnerabilityInfo 
              vulnerabilityId={selectedVulnerability}
              results={results}
            />
          </div>
        </div>
      )}
    </div>
  );
};