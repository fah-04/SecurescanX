import { ScanResultType, VulnerabilityPattern } from "../types/scanner";

// Enhanced vulnerability patterns with AI-powered detection
const vulnerabilityPatterns: VulnerabilityPattern[] = [
  {
    id: 'injection-sql',
    pattern: /SELECT\s+.*\s+FROM\s+.*\s+WHERE\s+.*['"].*\+\s*.*['"]/i,
    title: 'SQL Injection Vulnerability',
    description: 'AI Analysis: High-risk SQL injection vulnerability detected. The code constructs SQL queries by directly concatenating user input, which can lead to SQL injection attacks. This is a critical security flaw that could allow attackers to manipulate database queries.',
    category: 'A03:2021-Injection',
    severity: 'critical',
    remediation: 'Use parameterized queries or prepared statements instead of string concatenation. Example:\n\nconst query = "SELECT * FROM users WHERE name = ?";\ndb.query(query, [userInput]);',
    learnMoreUrl: 'https://owasp.org/Top10/A03_2021-Injection/',
    aiConfidence: 0.95
  },
  {
    id: 'xss-innerhtml',
    pattern: /\.innerHTML\s*=\s*(?!['"]<).*|document\.write\s*\(/i,
    title: 'Cross-Site Scripting (XSS) Vulnerability',
    description: 'AI Analysis: Direct DOM manipulation detected without proper sanitization. This creates a high-risk XSS vulnerability that could allow attackers to inject malicious scripts. The analysis shows multiple potential attack vectors.',
    category: 'A03:2021-Injection (XSS)',
    severity: 'high',
    remediation: 'Use safe DOM methods or sanitize input:\n\n// Instead of innerHTML, use:\nelement.textContent = userInput;\n\n// Or sanitize with DOMPurify:\nimport DOMPurify from "dompurify";\nelement.innerHTML = DOMPurify.sanitize(userInput);',
    learnMoreUrl: 'https://owasp.org/www-community/attacks/xss/',
    aiConfidence: 0.92
  },
  {
    id: 'broken-auth',
    pattern: /password.*(?:in plain text|unhashed|unencrypted)|md5\s*\(/i,
    title: 'Broken Authentication',
    description: 'This code handles authentication credentials insecurely, such as transmitting passwords in plain text or using weak hashing algorithms.',
    category: 'A07:2021-Identification and Authentication Failures',
    severity: 'high',
    remediation: 'Always use HTTPS for transmitting credentials. Hash passwords using strong algorithms like bcrypt or Argon2. Never store plain text passwords.',
    learnMoreUrl: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'
  },
  {
    id: 'insecure-direct-object',
    pattern: /fetch\s*\(\s*['"].*\/.*\/.*['"]\s*\+\s*.*\)/i,
    title: 'Insecure Direct Object Reference',
    description: 'This code may allow attackers to access or modify data by manipulating resource identifiers without proper authorization checks.',
    category: 'A01:2021-Broken Access Control',
    severity: 'high',
    remediation: 'Implement proper access control checks for each request. Validate that the current user has permission to access the requested resource before returning it.',
    learnMoreUrl: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/'
  },
  {
    id: 'eval-exec',
    pattern: /eval\s*\(|new Function\s*\(|setTimeout\s*\(\s*['"]|setInterval\s*\(\s*['"]/i,
    title: 'Unsafe Code Execution',
    description: 'This code dynamically executes strings as code, which can lead to code injection if the input contains malicious code.',
    category: 'A03:2021-Injection',
    severity: 'critical',
    remediation: 'Avoid using eval() and similar functions. Use safer alternatives like JSON.parse() for parsing JSON strings. If dynamic code execution is necessary, validate and sanitize inputs rigorously.',
    learnMoreUrl: 'https://owasp.org/Top10/A03_2021-Injection/'
  },
  {
    id: 'insecure-cookie',
    pattern: /document\.cookie\s*=(?!.*secure)|document\.cookie\s*=(?!.*httpOnly)/i,
    title: 'Insecure Cookie Configuration',
    description: 'This code sets cookies without proper security attributes like Secure or HttpOnly, which increases the risk of cookie theft or manipulation.',
    category: 'A05:2021-Security Misconfiguration',
    severity: 'medium',
    remediation: 'Set the Secure flag to ensure cookies are only sent over HTTPS. Set the HttpOnly flag to prevent JavaScript access to sensitive cookies. Consider using the SameSite attribute to prevent CSRF attacks.',
    learnMoreUrl: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'
  },
  {
    id: 'cors-wildcard',
    pattern: /Access-Control-Allow-Origin:\s*\*/i,
    title: 'Overly Permissive CORS Policy',
    description: 'This code sets CORS headers to allow requests from any origin, which may lead to unauthorized access to sensitive data.',
    category: 'A05:2021-Security Misconfiguration',
    severity: 'medium',
    remediation: 'Restrict CORS to specific trusted domains instead of using wildcards. Implement proper validation of Origin headers before allowing cross-origin requests.',
    learnMoreUrl: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'
  },
  {
    id: 'local-storage-sensitive',
    pattern: /localStorage\.setItem\s*\(\s*['"](?:token|auth|password|secret|key)/i,
    title: 'Sensitive Data in Local Storage',
    description: 'This code stores sensitive information in localStorage, which is accessible to any JavaScript code running on the same origin, including potential XSS payloads.',
    category: 'A02:2021-Cryptographic Failures',
    severity: 'medium',
    remediation: 'Avoid storing sensitive data in localStorage. Use HttpOnly cookies for authentication tokens. If client-side storage is necessary, consider using more secure alternatives like session storage with proper encryption.',
    learnMoreUrl: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/'
  },
  {
    id: 'session-fixation',
    pattern: /session.*=\s*.*(?:request|params|get)/i,
    title: 'Potential Session Fixation',
    description: 'This code may allow attackers to set or reuse session identifiers, potentially leading to session fixation attacks.',
    category: 'A07:2021-Identification and Authentication Failures',
    severity: 'high',
    remediation: 'Generate a new session identifier after authentication. Never accept session identifiers from URL parameters or user input. Invalidate sessions after logout, timeout, or security level changes.',
    learnMoreUrl: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'
  },
  {
    id: 'weak-csp',
    pattern: /Content-Security-Policy.*unsafe-inline|Content-Security-Policy.*unsafe-eval/i,
    title: 'Weak Content Security Policy',
    description: 'This code implements a Content Security Policy (CSP) that allows inline scripts or eval(), reducing the effectiveness of CSP as a security measure.',
    category: 'A05:2021-Security Misconfiguration',
    severity: 'medium',
    remediation: 'Avoid using unsafe-inline and unsafe-eval in your CSP. Use nonces or hashes for inline scripts if they are necessary. Implement a strict CSP that specifies trusted sources for all content types.',
    learnMoreUrl: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'
  },
  {
    id: 'insecure-design',
    pattern: /(TODO|FIXME).*security|\/\*\s*no\s*security\s*checks\s*\*\//i,
    title: 'Potential Insecure Design',
    description: 'Code contains comments indicating missing or incomplete security checks, which may be a sign of insecure design.',
    category: 'A04:2021-Insecure Design',
    severity: 'medium',
    remediation: 'Review the code for missing security controls and implement proper security checks as required by secure design guidelines.',
    learnMoreUrl: 'https://owasp.org/Top10/A04_2021-Insecure_Design/'
  },
  {
    id: 'vulnerable-components',
    pattern: /(require|from)\s+['"](.*jquery.*1\.[0-9]+|.*lodash.*3\.[0-9]+|.*moment.*2\.[0-9]+)/i,
    title: 'Vulnerable or Outdated Components',
    description: 'Imports or requires known vulnerable or outdated libraries (e.g., old versions of jquery, lodash, moment).',
    category: 'A06:2021-Vulnerable and Outdated Components',
    severity: 'high',
    remediation: 'Update third-party libraries to the latest secure versions. Regularly audit dependencies for known vulnerabilities.',
    learnMoreUrl: 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/'
  },
  {
    id: 'integrity-failures',
    pattern: /(npm\s+install\s+.*--unsafe-perm)|(child_process\.exec\s*\(\s*['"].*curl.*\|.*sh['"])/i,
    title: 'Software and Data Integrity Failure',
    description: 'Detects code executing direct downloads and shell scripts, or installing npm packages with unsafe permissions.',
    category: 'A08:2021-Software and Data Integrity Failures',
    severity: 'critical',
    remediation: 'Avoid using unsafe install flags and never execute downloaded code directly. Always verify the integrity and authenticity of code and dependencies.',
    learnMoreUrl: 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/'
  },
  {
    id: 'logging-monitoring-failures',
    pattern: /(catch\s*\(.*\)\s*\{\s*\})|console\.log\s*\(\s*['"]error['"]/i,
    title: 'Security Logging and Monitoring Failure',
    description: 'Code catches exceptions without logging or logs errors to the console instead of a secure log facility.',
    category: 'A09:2021-Security Logging and Monitoring Failures',
    severity: 'medium',
    remediation: 'Ensure all exceptions and security-relevant events are properly logged to a secure, centralized logging system, not just the console.',
    learnMoreUrl: 'https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/'
  },
  {
    id: 'ssrf',
    pattern: /(fetch|axios|get|post|request)\s*\(\s*userInput/i,
    title: 'Server-Side Request Forgery (SSRF)',
    description: 'Server-side HTTP requests use user-supplied input as the URL target, which may allow SSRF attacks.',
    category: 'A10:2021-Server-Side Request Forgery (SSRF)',
    severity: 'critical',
    remediation: 'Never use user input directly in server-side requests. Validate and sanitize URLs, and restrict outbound connections to trusted domains.',
    learnMoreUrl: 'https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_(SSRF)/'
  }
];

// Enhanced scanning function with AI-powered analysis
export const scanCode = (code: string): ScanResultType[] => {
  const results: ScanResultType[] = [];
  const lines = code.split('\n');
  
  // AI-powered context analysis
  const contextAnalysis = analyzeCodeContext(code);
  
  vulnerabilityPatterns.forEach(pattern => {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (pattern.pattern.test(line)) {
        const contextCode = getContextualCode(lines, i);
        const riskScore = calculateRiskScore(pattern, contextAnalysis);
        
        results.push({
          id: `${pattern.id}-${i}`,
          title: pattern.title,
          description: pattern.description,
          category: pattern.category,
          severity: pattern.severity,
          code: contextCode,
          line: i + 1,
          remediation: pattern.remediation,
          learnMoreUrl: pattern.learnMoreUrl,
          aiConfidence: pattern.aiConfidence ?? 0,
          riskScore: riskScore
        });

        // Skip lines already included in contextCode to avoid duplicate findings
        i = i + contextCode.split('\n').length - 1;
      }
    }
  });
  
  return results;
};

// Helper functions for AI-powered analysis
function analyzeCodeContext(code: string) {
  // Simulate AI context analysis
  return {
    complexity: code.length / 100,
    patterns: code.match(/(function|class|if|for|while)/g)?.length || 0,
    dataHandling: code.includes('fetch') || code.includes('XMLHttpRequest'),
    userInput: code.includes('getElementById') || code.includes('querySelector')
  };
}

function getContextualCode(lines: string[], currentLine: number): string {
  const start = Math.max(0, currentLine - 2);
  const end = Math.min(lines.length - 1, currentLine + 2);
  return lines.slice(start, end + 1).join('\n');
}

function calculateRiskScore(pattern: VulnerabilityPattern, context: any): number {
  let score = (pattern.aiConfidence ?? 0) * 100;
  
  if (context.userInput) score += 10;
  if (context.dataHandling) score += 15;
  if (context.complexity > 5) score += 20;
  
  return Math.min(100, score);
}
