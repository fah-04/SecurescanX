export type SeverityType = 'critical' | 'high' | 'medium' | 'low' | 'none';

export interface ScanResultType {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: SeverityType;
  code: string;
  line: number;
  remediation: string;
  learnMoreUrl: string;
  aiConfidence: number;
  riskScore: number;
}

export interface VulnerabilityPattern {
  id: string;
  pattern: RegExp;
  title: string;
  description: string;
  category: string;
  severity: SeverityType;
  remediation: string;
  learnMoreUrl: string;
  aiConfidence: number;
}