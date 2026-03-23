# 🩸 HemoLink: National Blood Management & Interoperability Platform

![HemoLink Header](https://img.shields.io/badge/HemoLink-National--Grade-red?style=for-the-badge&logo=heart)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-green?logo=hl7&style=flat-square)](https://www.hl7.org/fhir/R4/)
[![ABDM Ready](https://img.shields.io/badge/ABDM-Ready-blue?style=flat-square)](https://abdm.gov.in/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)

**HemoLink** is a government-grade, national-level blood management system designed for scale, security, and interoperability. It serves as a unified digital backbone connecting donors, hospitals, and blood banks across the country using HL7 FHIR R4 standards.

---

## 🏛️ Ecosystem Overview
HemoLink is more than just a matching app; it is a comprehensive clinical and logistical suite:
- **National API Platform**: RESTful infrastructure for seamless integration with e-RaktKosh, UHI, and private hospital networks.
- **Biometric Trust Layer**: Simulated + Hardware-ready fingerprint verification with SHA-256 template encryption.
- **FHIR R4 EHR**: Complete Electronic Health Record system with ABDM-compliant Patient, Observation, and Procedure resources.
- **Blood Component Tracking**: End-to-end lifecycle system tracing PRBC, Platelets, Plasma, and Cryoprecipitate across the national grid.
- **21-Module National UI System**: A "Gov-Ready" dark/red premium glassmorphic visual tier built with Shadcn, Next.js, and unified Design Tokens.

### ✅ Completed National-Grade Modules (Final)
All modules have been upgraded to the **Premium HemoLink National Tier**:
- **RBAC & Governance**: Hierarchical access for National, State, and District admins with protected routes.
- **Audit Registry**: Real-time logging of all critical system events for regulatory compliance.
- **Smart Routing Engine**: Proximity and stock-level based ranking for inter-bank blood transfers.
- **National API Monitor**: Live metrics for endpoint health, latency, and error rates across the grid.
- **Incident Response Center**: Live timeline and crisis control for shortages and emergencies.
- **Facility Verification**: Onboarding and approval dashboard for hospitals and blood banks.
- **Staff Command Center**: National personnel management and access tier control.
- **Volunteer Portal**: Citizen network for camp assistance and emergency response.
- **Donor Trust badges**: Tiered verification system (Bronze to Platinum) based on donation history.
- **Aadhaar Biometric Hub**: High-fidelity offline identity verification with simulated fingerprint scanning.
- **Offline Rural Mode**: Local queuing and sync logic for blood camps in low-connectivity zones.
- **National Compliance Reports**: Automated generation of regulatory reports in PDF/CSV formats.

---

## 🚀 Advanced Capabilities

### 🩸 National Data Integration
- **e-RaktKosh Sync**: Real-time normalization of government blood bank feeds.
- **Unified Stock Model**: Standardized inventory tracking across private and public sectors.
- **Haversine Matcher**: Precise radius-based search (0-100km) with pincode and district filters.

### 🤖 AI Donor Match Engine
- **Multi-Factor Ranking**: Prioritizes donors based on distance, blood compatibility, reliability (Trust Score), and clinical eligibility (last donation date).
- **Smart Match Modal**: Instant AI analysis of the best matches for every critical SOS.

### 🏥 Hospital & Clinical Suite
- **Blood Component Management**: Lifecycle dashboards tracking component splitting (PRBC, Platelets, Plasma), expiry dates, storage temperatures, and TTI (Transfusion Transmitted Infection) validation.
- **TTI & Antibody Screening**: FHIR-compliant laboratory module for HBsAg, HIV, HCV, Syphilis, and Malaria tests.
- **Inventory & Staffing**: Professional dashboard for inventory management, stock updates, and staff shift automation.
- **Inter-Bank Coordination**: Direct bank-to-bank blood transfer request system with urgency scoring.

### 🛡️ Compliance & Safety
- **NBTC Compliance**: Pre-donation screening modals enforcing age, weight, and hemoglobin safety rules.
- **Audit Logging**: Comprehensive system-wide event logging (SOS, Stock, Verify) for government auditing.
- **EHR Timeline**: Master medical timeline for donors including donation history, screenings, and eligibility status.

---

## 🛠️ API & Interoperability
HemoLink provides a **National API Platform** for third-party integration:
- **Endpoints**: `/api/national/donor`, `/api/national/bloodbank`, `/api/national/search`.
- **FHIR Export**: One-click JSON export of donor medical records in HL7 FHIR Bundle format.
- **Documentation**: Swagger-style interactive docs available at `/api/national/docs`.

---

## 📦 Architecture & Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/yourusername/hemolink.git
   npm install
   ```

2. **Environment Configuration**:
   ```env
   NEXT_PUBLIC_DB_MODE="local" # Options: local, firebase, supabase
   NEXT_PUBLIC_API_TRUST_KEY="your-national-key"
   ```

3. **Run Platform**:
   ```bash
   npm run dev # Port 9002
   ```

---

## 📂 Project Structure
```text
src/
├── app/
│   ├── api/national/   # National API Infrastructure
│   ├── dashboard/      # EHR, Coordination, & Admin suites
│   └── emergency/      # Real-time Broadcast Network
├── components/
│   ├── ui/             # 21-Module Shadcn Premium Components
│   ├── verification/   # Aadhaar entry modules
│   ├── FingerprintScanner.tsx # Simulated biometric scanner
│   └── ehr/            # FHIR Timeline & Clinical cards
├── lib/
│   ├── fhir/           # HL7 FHIR R4 Transformers & Models
│   ├── matching/       # AI Match Engine (Haversine)
│   └── biometric/      # Hardware Integration Layer
├── styles/
│   └── design-tokens.css # Global spacing & neon typography
```

---

## 📄 Compliance & License
Designed to meet **NDHM (National Digital Health Mission)** structural standards. Distributed under the **MIT License**.

---
*Developed with ❤️ for the national blood supply chain to ensure "No life is lost for want of blood."*

