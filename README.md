# 🩸 HemoLink: National Blood Management & Interoperability Platform

![HemoLink Header](https://img.shields.io/badge/HemoLink-National--Grade-red?style=for-the-badge&logo=heart)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Production_Ready-black?logo=vercel&style=flat-square)](https://vercel.com/)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-green?logo=hl7&style=flat-square)](https://www.hl7.org/fhir/R4/)
[![ABDM Ready](https://img.shields.io/badge/ABDM-Ready-blue?style=flat-square)](https://abdm.gov.in/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)

**HemoLink** is a premium, government-grade, national-level blood management system designed for scale, security, and interoperability. It serves as a unified digital backbone connecting donors, hospitals, and blood banks across the country using HL7 FHIR R4 standards.

🔥 **Latest Update (v2.5.0-PRO):** Fully audited for production. Features a strictly enforced **Premium Night View (Dark Mode) UI**, Zero-Error static build verification, and globally synchronized `next-intl` localization matrices.

---

## 🏛️ Ecosystem Overview
HemoLink is more than just a matching app; it is a comprehensive clinical and logistical suite:
- **National API Platform**: RESTful infrastructure for seamless integration with e-RaktKosh, UHI, and private hospital networks.
- **Biometric Trust Layer**: Simulated + Hardware-ready fingerprint verification with SHA-256 template encryption.
- **FHIR R4 EHR**: Complete Electronic Health Record system with ABDM-compliant Patient, Observation, and Procedure resources.
- **Blood Component Tracking**: End-to-end lifecycle system tracing PRBC, Platelets, Plasma, and Cryoprecipitate across the national grid.
- **Unified Operations Hub**: A professional, grouped control center (the *MODULES* drop-down) replacing legacy navigation with deep search, color-coded status, and unified view modes.
- **Global i18n System**: Full multilingual support via `next-intl` (English, Hindi, Bengali, Marathi, Tamil) with deep-merged strict rendering and zero runtime warnings.
- **AI National Upgrade**: Global AI Engine wrapper with 5 dedicated endpoints for matching, predictive heatmap, fraud detection, routing, and emergency classification.

### ✅ Completed National-Grade Modules
All modules have been aggressively optimized to the **Premium HemoLink National Tier**:
- **Production Grade Architecture**: Swept entirely clean of all React hydration errors, JSX structural bugs, and unhandled routing. Vercel deployment green-lit.
- **Global Multilingual Support**: 100% translated UI components with instant locale switching and persistence.
- **Premium Dark Aesthetics**: Complete UI overhaul featuring neon haptics, glow cards, and glassmorphism.
- **RBAC & Governance**: Hierarchical access for National, State, and District admins with protected routes.
- **Audit Registry**: Real-time logging of all critical system events for regulatory compliance.
- **Smart Routing Engine**: Proximity and stock-level based ranking for inter-bank blood transfers.
- **National API Monitor**: Live metrics for endpoint health, latency, and error rates across the grid.
- **Incident Response Center**: Live timeline and crisis control for shortages and emergencies.
- **Facility Verification**: Onboarding and approval dashboard for hospitals and blood banks.
- **Staff Command Center**: National personnel management and access tier control.
- **Volunteer Portal**: Citizen network for camp assistance and emergency response.
- **Aadhaar Biometric Hub**: High-fidelity offline identity verification with simulated fingerprint scanning.
- **Offline Rural Mode**: Local queuing and sync logic for blood camps in low-connectivity zones.

---

## 🚀 Advanced Capabilities

### 🩸 National Data Integration
- **Multilingual Core**: Powered by `next-intl`, ensuring accessible healthcare across diverse linguistic demographics.
- **e-RaktKosh Sync**: Real-time normalization of government blood bank feeds.
- **Unified Stock Model**: Standardized inventory tracking across private and public sectors.
- **Haversine Matcher**: Precise radius-based search (0-100km) with pincode and district filters.

### 🤖 AI National Upgrade
- **Global AI Engine**: Reusable wrapper for deterministic systemic intelligence.
- **Predictive Heatmap**: 3-day availability trends with DISTRICT-level shortage warnings.
- **Fraud & Security AI**: Real-time detection of duplicate Aadhaar and abnormal transaction spikes.
- **Routing Optimizer**: Logistics pathfinding for critical blood transfers.
- **Emergency Classifier**: Severity-based triage for high-priority clinical requests.

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
   git clone https://github.com/EAZMIKEY/hemolink.git
   npm install
   ```

2. **Environment Configuration**:
   ```env
   NEXT_PUBLIC_DB_MODE="local" # Options: local, firebase, supabase
   NEXT_PUBLIC_API_TRUST_KEY="your-national-key"
   ```

3. **Run Platform Locally (Development)**:
   ```bash
   npm run dev # Runs on Port 9002
   ```

4. **Production Build (Vercel Ready)**:
   ```bash
   npm run build
   ```
   *HemoLink is guaranteed zero-error for Next.js strict Vercel deployment workflows.*

---

## 📂 Project Structure
```text
src/
├── app/
│   ├── [locale]/       # Localized App Router (EN, HI, BN, MR, TA)
│   │   ├── dashboard/  # EHR & Admin suites
│   │   └── emergency/  # Real-time Broadcast Network
│   └── api/            # National API & AI Infrastructure
├── components/
│   ├── ai/             # National AI Panel & Insights
│   ├── layout/         # Navbar & Unified Operations Hub
│   ├── ui/             # 21-Module Shadcn Premium Components
│   └── ehr/            # FHIR Timeline & Clinical cards
├── messages/           # I18n Dictionaries (JSON)
├── lib/
│   ├── ai/             # Global AI Engine & Logic
│   ├── fhir/           # HL7 FHIR R4 Transformers
│   └── matching/       # AI Match Engine
├── i18n/               # Next-Intl Routing config
├── middleware.ts       # Automatic Locale Redirection
└── styles/
    └── design-tokens.css # Global spacing & neon typography
```

---

## 📄 Compliance & License
Designed to meet **NDHM (National Digital Health Mission)** structural standards. Distributed under the **MIT License**.

---
*Developed with ❤️ for the national blood supply chain to ensure "No life is lost for want of blood."*
