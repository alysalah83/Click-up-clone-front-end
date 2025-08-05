# ClickUp Clone - Full-Stack Project Management Application

A pixel-perfect recreation of ClickUp's core functionality, built entirely from scratch.  
This project showcases **modern React 19 development**, custom UI components, and a fully integrated backend, following scalable and maintainable coding practices.

**A full-stack ClickUp clone built with Next.js 15, React 19, Node.js, and MongoDB — featuring real-time drag-and-drop task management, custom UI components, and a secure authentication system.**

## 🚀 Live Demo

[**View Application**](https://click-up-clone-two.vercel.app/) • [**Frontend Repo**](https://github.com/alysalah83/Click-up-clone-front-end) • [**Backend Repo**](https://github.com/alysalah83/click-up-clone-backend)

---

## 🖼️ Application Preview

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="site-images/home%20page.png" alt="Home Page" width="300" />
        <br>
        <strong>Home Page</strong>
      </td>
      <td align="center">
        <img src="site-images/login.jpeg" alt="Login" width="300" />
        <br>
        <strong>Login Page</strong>
      </td>
      <td align="center">
        <img src="site-images/signup.jpeg" alt="Signup" width="300" />
        <br>
        <strong>Signup Page</strong>
       <td align="center">
        <img src="site-images/overview.png" alt="Overview" width="300" />
        <br>
        <strong>Overview</strong>
      </td>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="site-images/dashboard.png" alt="Dashboard" width="300" />
        <br>
        <strong>Dashboard</strong>
      </td>
      <td align="center">
        <img src="site-images/board.png" alt="Board View" width="300" />
        <br>
        <strong>Board View</strong>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="site-images/list.png" alt="List View" width="300" />
        <br>
        <strong>List View</strong>
      </td>
      <td align="center">
        <img src="site-images/table.png" alt="Table View" width="300" />
        <br>
        <strong>Table View</strong>
      </td>
      <td align="center" colspan="3">
        <img src="site-images/create%20workspace.png" alt="Create Workspace" width="300" />
        <br>
        <strong>Create Workspace</strong>
      </td>
    </tr>
    <tr>
    <td align="center">
        <img src="site-images/table2.png" alt="Table View 2" width="300" />
        <br>
        <strong>Table View 2</strong>
      </td>
    </tr>
  </table>
</div>

---

## 📋 Overview

**"Manage your workspaces all in one"** – A complete project management platform featuring:

- **Workspace & project organization** with custom icons and colors
- **Drag-and-drop task boards** with real-time updates
- **Multiple view types** (Board, List, Table) for task management
- **Advanced task properties** (priority, dates, assignees, tags, status)
- **Bulk operations** for efficient task management
- **Dashboard analytics** with progress tracking and charts
- **Authentication system** with secure JWT implementation

Built with:

- **Next.js 15 + React 19 + TypeScript** for the frontend
- **Node.js + Express + MongoDB** for the backend
- **100% custom UI components** using Tailwind CSS (no external UI library)

---

## ✨ Features

### 🏢 Workspace & Project Management

- **Unlimited workspaces** with custom name, icon picker, and color picker
- **List organization** within workspaces for better project structure
- **Complete CRUD operations** with real-time UI updates
- **Workspace avatars** for visual identification

### 📝 Advanced Task Management

- **Multiple view types:**
  - **Board View** - Kanban-style drag-and-drop interface
  - **List View** - Clean, organized task listing
  - **Table View** - Spreadsheet-like detailed interface
- **Comprehensive task properties:**
  - Task names and rich descriptions
  - Status tracking with customizable workflows
  - Priority levels (Low, Medium, High, Urgent)
  - Due dates and flexible date ranges
  - Task assignees and team collaboration
  - Custom tags and labels
- **Drag-and-drop functionality** across all views with `@dnd-kit/core`
- **Bulk operations** - Select and manage multiple tasks simultaneously
- **Task filtering and search** for quick navigation

### 🔐 Authentication & Security

- **Sign up & login pages** with comprehensive form handling
- **Form validation** using `react-hook-form` + `zod` schemas
- **JWT-based authentication** with secure HTTP-only cookies
- **Protected routes** with automatic redirects
- **Session management** with token refresh capabilities

### 📊 Analytics & Dashboard

- **Task distribution charts** built with `recharts`
- **Progress tracking** with visual progress bars
- **Completion statistics** across workspaces and lists
- **Activity timeline** showing recent changes
- **Workload visualization** for better task management
- **Overview page** displaying all lists with progress indicators

### 🎨 Custom UI System

All components built from scratch using Tailwind CSS:

- **Navigation system** with collapsible sidebar
- **Modal framework** for forms and confirmations
- **Dropdown menus** with keyboard navigation
- **Toast notification system** for user feedback
- **Tooltip system** for contextual help
- **Skeleton loaders** for smooth loading states
- **Icon picker** with searchable icon library
- **Color picker** for workspace customization
- **Date range picker** for flexible scheduling
- **Responsive design** optimized for all devices

---

## 🛠 Tech Stack

### Frontend

- **Framework:** Next.js 15.4.1 (App Router) + React 19.0.0 + TypeScript
- **State Management:** Zustand 5.0.5
- **Data Fetching:** TanStack React Query 5.83.0 + Axios 1.10.0
- **Forms & Validation:** React Hook Form 7.60.0 + Zod 4.0.0 + @hookform/resolvers 5.1.1
- **Drag & Drop:** @dnd-kit/core 6.3.1
- **Date Handling:** react-date-range 2.0.1 + date-fns 4.1.0
- **UI & Styling:** Tailwind CSS + clsx 2.1.1
- **Icons:** React Icons 5.5.0
- **Charts:** Recharts 3.1.0
- **Cookies:** js-cookie 3.0.5

### Backend

- **Runtime & Framework:** Node.js + Express.js
- **Database:** MongoDB + Mongoose ODM
- **Validation:** Zod schemas for server-side validation
- **Authentication:** JWT with secure cookie implementation
- **API:** RESTful API with proper error handling
- **Security:** CORS configuration and request validation

### Development Tools

- **DevTools:** @tanstack/react-query-devtools 5.83.0
- **Optimization:** babel-plugin-react-compiler 19.1.0-rc.2
- **Type Safety:** Full TypeScript implementation across frontend and backend

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- MongoDB database
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/alysalah83/Click-up-clone-front-end.git
cd Click-up-clone-front-end

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_JWT_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27027/clickup-clone
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:3000
```

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

---

## 📁 Project Structure

```
src/
├── app/ # Next.js 15 App Router
│ └── (dashboard)/ # Protected dashboard routes
├── components/ # Custom UI components
│ ├── common/ # Shared components
│ ├── layout/ # Layout components
│ ├── ui/ # Base UI elements
│ └── features/ # Feature-specific components
│        │ ├── auth/ # Authentication components
│        │ ├── board-tasks/ # Kanban board components
│        │ ├── dashboard/ # Dashboard analytics
│        │ ├── list-tasks/ # List view components
│        │ ├── lists-side-nav # Side navigation
│        │ ├── overview/ # Overview components
│        │ ├── table-tasks/ # Table view components
│        │ ├── workspace/ # Workspace management
│        │ ├── actions/ # Workspace actions
│        │ ├── components/ # UI components
│        │ ├── consts/ # Constants
│        │ ├── hooks/ # Custom hooks
│        │ ├── types/ # Type definitions
│        │ ├── utils/ # Utilities
│        │ └── validations # Validation logic
├── config/ # Configuration files
├── constants/ # App constants
├── contexts/ # React contexts
├── lib/ # Core libraries
│ ├── api/ # API configuration
│ ├── axios/ # Axios setup
│ ├── client/ # Client-side libraries
│ ├── server/ # Server-side utilities
│ ├── utils/ # Shared utilities
│ └── validations/ # Zod Validation schemas
├── shared/ # Shared resources
├── stores/ # Zustand state stores
├── styles/ # Custom styles
├── types/ # Global TypeScript types
├── utils/ # Utility functions
├── middleware.ts # Next.js middleware
└── env.local # Environment variables
```

---

## 🎯 Key Highlights

### Technical Achievements

- **100% Custom Components** - No external UI library dependencies
- **Modern React Patterns** - Latest React 19 features and Next.js 15 App Router
- **Type Safety** - Comprehensive TypeScript implementation
- **Performance Optimized** - React Query caching, Zustand state management
- **Accessibility** - Keyboard navigation and ARIA support
- **Responsive Design** - Mobile-first approach with seamless desktop experience

### Full-Stack Integration

- **Custom Backend API** - Built from scratch with Node.js and Express
- **Database Design** - Efficient MongoDB schema with proper relationships
- **Real-time Updates** - Optimistic UI updates with server synchronization
- **Error Handling** - Comprehensive error management across the stack
- **Security Implementation** - JWT authentication with secure cookie handling

### User Experience

- **Intuitive Interface** - Clean, modern design inspired by ClickUp
- **Smooth Interactions** - Drag-and-drop with visual feedback
- **Loading States** - Skeleton loaders for better perceived performance
- **Form Validation** - Real-time validation with helpful error messages
- **Responsive Feedback** - Toast notifications and loading indicators

---

## 💼 Portfolio Showcase

This project demonstrates advanced full-stack development capabilities with a balanced focus on both frontend and backend expertise:

### 💻 Frontend Expertise

- **React 19 & Next.js 15** - Bleeding-edge features including:
  - Server Actions for data mutations
  - React Compiler for automatic optimizations
  - Next.js App Router architecture
- **Zod Validation Ecosystem** - Unified validation across stack:
  - Frontend form validation with `react-hook-form` + Zod
  - Shared validation schemas with backend
  - Type inference from Zod schemas
- **State Management** - Zustand for global state + React Query for server state:
  - Optimistic UI updates
  - Automatic cache management
  - Background data synchronization
- **Real-time UI** - Smooth drag-and-drop interfaces with `@dnd-kit`:
  - Custom collision detection
  - Performance-optimized rendering
  - Touch device support
- **Data Visualization** - Interactive charts with Recharts:
  - Task distribution pie charts
  - Progress tracking bar charts
  - Workload heatmaps
- **Performance Optimization**:

  - Code splitting with dynamic imports
  - Memoization techniques
  - Efficient virtualized lists

  ### 🖥️ Backend Expertise

- **RESTful API Design** - Structured endpoints with proper HTTP methods and status codes
- **Database Architecture** - MongoDB schema design with Mongoose for:
  - Workspace hierarchy and permissions
  - Task relationships and dependencies
  - User management with secure credentials
- **Authentication System** - JWT implementation with:
  - Secure HTTP-only cookies
  - Refresh token rotation
  - Session management middleware
- **Server-Side Validation** - Comprehensive Zod schemas for all API endpoints
- **Middleware Architecture** - Custom middleware for:
  - Authentication verification
  - Error handling
  - CORS configuration
- **Aggregation Pipelines** - Complex MongoDB aggregations for:
  - Dashboard analytics
  - Progress tracking
  - Task distribution statistics
- **Query Optimization** - Efficient data retrieval with:
  - Proper indexing
  - Pagination
  - Population of related documents
- **Security Implementation** - Password hashing with bcrypt, rate limiting, and XSS protection

### 🔗 Full-Stack Integration

- **End-to-End Type Safety** - Shared TypeScript types across frontend and backend
- **API Contract Enforcement** - Zod validation on both client and server
- **Authentication Flow** - Seamless JWT handling with cookie management
- **Error Handling System** - Unified error format with proper HTTP status codes
- **Deployment Architecture** - Vercel for frontend + cloud services for backend
- **CI/CD Pipeline** - Automated testing and deployment workflows
- **WebSockets Implementation** - Real-time updates for collaborative features

### 🌟 Advanced Features

- **Server Actions** - Secure direct database mutations from Next.js:
  - Workspace creation/updates
  - Bulk task operations
  - User profile management
- **Custom Hooks Library** - Reusable logic for:
  - Drag-and-drop operations
  - Form handling
  - API request management
- **Accessibility Compliance** - WCAG 2.1 standards implementation:
  - Keyboard navigation
  - ARIA attributes
  - Screen reader support
- **Internationalization Ready** - i18n architecture setup for localization
- **Theme Engine** - Dark mode/light mode with system preference detection

**[🚀 Live Demo](https://click-up-clone-two.vercel.app/)** | **[📚 Repository](https://github.com/alysalah83/Click-up-clone-front-end)**

_A comprehensive demonstration of modern full-stack development capabilities_
