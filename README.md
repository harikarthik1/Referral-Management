# Go Business - Referral Dashboard Frontend Application

A responsive, high-performance web dashboard for managing and analyzing referral-based sales and marketing performance. Built as a React single-page application (SPA), this frontend provides robust authorization controls, data filtering and sorting, and detailed insights into referral metrics and specific accounts.

---

## 🚀 Key Features

*   **Secure Authentication**:
    *   JWT-based session authentication integration via custom sign-in APIs.
    *   Token persistence managed securely on the client side using [js-cookie](https://github.com/js-cookie/js-cookie) cookies.
    *   Role/Session boundaries enforced using specialized routes: `ProtectedRoute` for authenticated sessions and `PublicOnlyRoute` for login screens.
*   **Analytics Overview Dashboard**:
    *   **Metrics Summary Panel**: Dynamic visual overview showing key performance indicators (KPIs) like total profits, conversion rates, and referral counts.
    *   **Service Summary Module**: Clean presentation of service names, your referrals, active referrals, and total earnings.
    *   **Referral Invitation Console**: Quick copy-to-clipboard functionality to instantly share custom referral links and codes.
*   **Referral Exploration Table**:
    *   **Live Search**: Search through referral entries by partner name or service.
    *   **Debounced Queries**: Debounced keypress events in the search input to minimize unnecessary network requests.
    *   **Toggle Sorting**: Easily toggle referral rows ascending or descending by date.
    *   **Client-Side Pagination**: Smooth pagination control (10 items per page) for comfortable data exploration.
*   **Referral Details View**:
    *   Deep-dive page displaying metadata, registered partner name, service badge, creation date, and total generated profits for a specific referral.
*   **Modular Styling**:
    *   Premium custom design aesthetics powered by vanilla CSS.
    *   Polished visual hierarchy with clean styling files associated with each component/page.
    *   Accessible interaction states, page load overlays, hover states, and smooth transition animations.

---

## 📁 Project Architecture & Components

The frontend codebase is organized using a component-driven structure:

*   **[App.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/App.js)**: The core entry point defining browser routing using React Router DOM.
*   **[api.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/api.js)**: Handlers for API communications with the remote backend, including login and referral data fetch requests. Includes helper utilities to normalize API payloads.
*   **Pages (`src/pages/`)**:
    *   [Login.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/pages/Login.js): Secure user sign-in page with validation and error reporting.
    *   [Dashboard.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/pages/Dashboard.js): Main metrics summary, searches, sorting options, and dynamic listings of referrals.
    *   [ReferralDetail.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/pages/ReferralDetail.js): Detailed performance statistics for a specific referral.
    *   [NotFound.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/pages/NotFound.js): Visual fallback for missing routes.
*   **Components (`src/components/`)**:
    *   [ProtectedRoute.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/ProtectedRoute.js): Route guard preventing unauthenticated access to system areas.
    *   [Navbar.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/Navbar.js): Top-level responsive navigation bar with logo and session sign-out actions.
    *   [Footer.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/Footer.js): Informational bottom footer bar.
    *   [MetricsOverview.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/MetricsOverview.js): UI component displaying summary counts and profitability scores.
    *   [ServiceSummary.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/ServiceSummary.js): Renders aggregated information on target services.
    *   [ReferralShare.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/ReferralShare.js): Input fields with copy functions to share referral codes/links.
    *   [ReferralsTable.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/ReferralsTable.js): Sortable, searchable, and paginated table detailing all referrals.
*   **Utilities (`src/utils/`)**:
    *   [format.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/utils/format.js): Helper functions for text formatting (e.g., date representations and currency units).

---

## 🛠️ Technology Stack

*   **React** (v19.2.x) - Component-driven library for building interactive user interfaces.
*   **React Router DOM** (v7.18.x) - Declarative routing client-side.
*   **JS Cookie** (v3.0.x) - Lightweight Cookie parsing/storage library for user JWT token persistence.
*   **Vanilla CSS** - Component-level styles, layout flexbox/grid, and theme palettes.

---

## ⚙️ Development & Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended) along with `npm`.

### Installation

Clone the repository, navigate to the frontend folder, and install the project dependencies listed in [package.json](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/package.json):

```bash
npm install
```

### Available Scripts

In the project directory, you can run the following scripts:

#### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make edits, and lint warnings will appear in the console.

#### `npm run build`

Builds the application for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, optimized, and ready to be deployed.

#### `npm test`

Launches the test runner in interactive watch mode.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you cannot go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project and copy all configuration files and transitive dependencies (Webpack, Babel, ESLint, etc.) directly into your project.

---

## 🔌 API Integration

The app communicates with a remote REST API Gateway for services:

*   **Sign In**: `POST https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin`
    *   Expects: `{ "email": "user@example.com", "password": "password" }`
    *   Returns: `{ "success": true, "data": { "token": "JWT_TOKEN" } }`
*   **Referrals List & Detail**: `GET https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals`
    *   Accepts query params: `id` (for detail lookup), `search` (name/service text matching), `sort` (`asc` / `desc` by date).
    *   Requires: `Authorization: Bearer <token>` request header.

---

## 🔒 Session Security & Guards

- **Token Storage**: The JWT token returned from sign-in is stored in a cookie named `jwt_token` using a secure implementation.
- **Route Guarding**: 
  - `ProtectedRoute` checks for the presence of the cookie. If none is found, the user is redirected to the `/login` page.
  - `PublicOnlyRoute` checks for the presence of the cookie. If found, authenticated users trying to access login are redirected back to the `/` root dashboard.

---

## ♿ Accessibility (a11y) & Usability

- **Keyboard Navigation**: Interactive rows in the [ReferralsTable.js](file:///d:/HariSadaKarthikPillala_FrontendAssessment/frontend/src/components/ReferralsTable.js) include `tabIndex={0}` and list handlers for `onKeyDown` so they can be selected using the **Enter** key.
- **Semantic Tags**: Includes standard HTML5 tags (`<main>`, `<section>`, `<nav>`, `<footer>`, `<header>`) alongside appropriate `aria-label` fields on regions.
- **Debounced Interaction**: The search form delays firing api calls by 300ms, enhancing responsiveness and minimizing resource utilization on both the browser and API servers.
