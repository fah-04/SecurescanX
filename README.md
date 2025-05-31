# OWASP Vulnerability Scanner

A simple web application that scans code snippets for the [OWASP Top 10](https://owasp.org/www-project-top-ten/) security vulnerabilities. This project is designed to help students and developers learn secure coding practices by actively detecting and understanding the most critical web application security risks.

---

## Table of Contents

- [About the Project](#about-the-project)
- [OWASP Top 10 Vulnerabilities](#owasp-top-10-vulnerabilities)
- [How the Scanner Works](#how-the-scanner-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

---

## About the Project

This OWASP Vulnerability Scanner is an educational tool that analyzes HTML and JavaScript code snippets for the most common and dangerous security flaws as defined by the OWASP Top 10. The scanner uses only open-source libraries and provides explanations and resources for each detected vulnerability.

---

## OWASP Top 10 Vulnerabilities

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is a list of the ten most critical web application security risks:

1. **Broken Access Control**  
   *Improper restrictions on authenticated users, allowing unauthorized actions or access.*

2. **Cryptographic Failures**  
   *Weak or improper cryptography leading to exposure of sensitive data.*

3. **Injection**  
   *Untrusted user input interpreted as code (e.g., SQL, command, or NoSQL injection).*

4. **Insecure Design**  
   *Flaws in design that lead to insecure applications, even with secure implementation.*

5. **Security Misconfiguration**  
   *Incorrect configurations (e.g., unnecessary features enabled, default accounts, verbose error messages).*

6. **Vulnerable and Outdated Components**  
   *Use of libraries or frameworks with known vulnerabilities.*

7. **Identification and Authentication Failures**  
   *Improper authentication or session management.*

8. **Software and Data Integrity Failures**  
   *Lack of integrity checks in software updates or critical data.*

9. **Security Logging and Monitoring Failures**  
   *Lack of monitoring and logging, making it hard to detect or respond to attacks.*

10. **Server-Side Request Forgery (SSRF)**  
    *Allowing attackers to make the server perform unauthorized requests.*

---

## How the Scanner Works

The web-app takes code as input (HTML/JS snippets) and analyzes it for patterns and practices that commonly lead to OWASP Top 10 risks. It leverages static analysis, open-source security rulesets, and best-practice checklists to flag potential vulnerabilities and offer actionable feedback.

### Detection Strategies

1. **Broken Access Control**
   - Flags missing or weak authorization checks in code.
   - Looks for unrestricted resource access in HTML/JS (e.g., missing role checks).

2. **Cryptographic Failures**
   - Warns if sensitive data is handled without encryption.
   - Detects use of weak cryptographic functions or plain-text storage.

3. **Injection**
   - Scans for unsafe code evaluation (e.g., use of `eval()`, dynamic SQL queries).
   - Highlights lack of input validation or parameterization.

4. **Insecure Design**
   - Identifies anti-patterns and missing security controls in the code structure.

5. **Security Misconfiguration**
   - Checks for debug code, verbose error messages, open CORS policies, and default credentials.

6. **Vulnerable and Outdated Components**
   - Alerts if dependencies used in code are known to have vulnerabilities (via open-source vulnerability databases).

7. **Identification and Authentication Failures**
   - Looks for weak authentication logic, missing password hashing, or insecure session management.

8. **Software and Data Integrity Failures**
   - Flags lack of integrity checks in code that handles updates or critical files.

9. **Security Logging and Monitoring Failures**
   - Warns if sensitive actions are not logged or if logs are missing for authentication events.

10. **Server-Side Request Forgery (SSRF)**
    - Detects code that accepts external URLs or fetches remote resources without validation.

---

## Features

- **Static Code Analysis**: Analyze code snippets for security flaws.
- **OWASP Top 10 Coverage**: Each vulnerability is explained and linked to best practices.
- **Actionable Feedback**: Clear remediation steps and learning resources.
- **Open Source**: Built using only open-source libraries.
- **Educational Focus**: Designed to teach and reinforce secure coding habits.

---

## Tech Stack

- **Frontend**: React / Vue / Vanilla JS (customizable)
- **Backend**: Node.js / Flask / Django (as needed for advanced analysis)
- **Analysis Libraries**: ESLint plugins, custom regex rules, open vulnerability databases
- **Other**: Docker for containerization (optional)

---

## Usage

1. **Clone the repository**  
   ```sh
   git clone https://github.com/yourusername/owasp-vulnerability-scanner.git
   ```
2. **Install dependencies**  
   ```sh
   cd owasp-vulnerability-scanner
   npm install
   ```
3. **Run the app**  
   ```sh
   npm start
   ```
4. **Submit code snippets**  
   Paste your HTML/JS code into the web interface and view flagged vulnerabilities.

---

## Contribution

Contributions are welcome! Please submit issues for bugs or feature requests, and open pull requests to add new detection rules or improve the scanner. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

This project is open source under the [MIT License](LICENSE).
