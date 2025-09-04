# 心灵港湾 (Soulful Home) - International Student Homestay Platform

## Project Overview

**URL**: https://lovable.dev/projects/8b93df0c-9e39-44ec-98cf-aec49d5a5278

心灵港湾 (Soulful Home) is a comprehensive bilingual platform that connects international students with carefully selected host families. The platform facilitates meaningful cultural exchange while providing students with safe, welcoming homes during their studies abroad.

## MVP Features & Functionality

### 🏠 Core Platform Features

#### 1. **Family Discovery & Browsing**
- Browse verified host families with detailed profiles
- Advanced filtering by location, experience, and preferences  
- Family stories, photos, and student testimonials
- Real-time pricing and availability information
- Bilingual support (English/中文)

#### 2. **User Authentication System**
- Multi-role authentication (Students, Host Families, Admins)
- Secure registration with email verification
- Role-based access control and permissions
- Automatic profile creation with database triggers

#### 3. **Connection & Inquiry System**
- Students can send personalized connection requests to families
- Real-time inquiry status tracking (pending/accepted/declined)
- Message system for initial communication
- Family response management dashboard

#### 4. **Dashboard Management**
- **Student Dashboard**: Track sent inquiries, view responses, manage connections
- **Family Dashboard**: Review incoming requests, accept/decline inquiries
- **Admin Dashboard**: System oversight, user management, platform analytics

#### 5. **Comprehensive Family Profiles**
- Detailed family stories and hosting philosophy
- Photo galleries of rooms and living spaces
- Student experience testimonials and reviews
- Practical information (location, transportation, house rules)
- Family member introductions and languages spoken

## System Architecture

### Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication + Real-time)
- **State Management**: TanStack Query + React Context
- **Routing**: React Router v6
- **Styling**: Custom design system with semantic tokens

### Database Schema

<lov-mermaid>
erDiagram
    users {
        uuid id PK
        string email
        timestamp created_at
    }
    
    user_profiles {
        uuid id PK
        uuid user_id FK
        string email
        enum user_type
        timestamp created_at
    }
    
    students {
        uuid id PK
        uuid user_id FK
        string name
        integer age
        string university
        string hometown
        text bio
        timestamp created_at
    }
    
    families {
        uuid id PK
        uuid user_id FK
        string name
        string location
        string hosting_experience
        integer current_students
        string price_range
        boolean verified
        timestamp created_at
    }
    
    inquiries {
        uuid id PK
        uuid student_id FK
        uuid family_id FK
        text message
        enum status
        timestamp created_at
    }
    
    users ||--|| user_profiles : "has profile"
    user_profiles ||--o| students : "can be student"
    user_profiles ||--o| families : "can be family"
    students ||--o{ inquiries : "sends inquiries"
    families ||--o{ inquiries : "receives inquiries"
</lov-mermaid>

## User Interaction Flows

### 1. Student Journey

<lov-mermaid>
journey
    title Student User Journey
    section Discovery
      Visit Platform: 5: Student
      Browse Families: 4: Student
      Filter Results: 4: Student
      View Family Details: 5: Student
    section Connection
      Register Account: 3: Student
      Send Inquiry: 4: Student
      Wait for Response: 2: Student
      Receive Acceptance: 5: Student
    section Management
      Access Dashboard: 4: Student
      Track Inquiries: 4: Student
      Manage Connections: 4: Student
</lov-mermaid>

### 2. Host Family Journey

<lov-mermaid>
journey
    title Host Family Journey
    section Onboarding
      Register as Family: 3: Family
      Create Profile: 4: Family
      Upload Photos: 4: Family
      Add Family Story: 4: Family
    section Management
      Access Dashboard: 5: Family
      Review Inquiries: 4: Family
      Accept/Decline: 4: Family
      Communicate: 5: Family
</lov-mermaid>

### 3. Authentication Flow

<lov-mermaid>
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Supabase Auth
    participant DB as Database
    participant T as Trigger Function

    U->>F: Register (email, password, userType)
    F->>S: signUp()
    S->>DB: Insert into auth.users
    DB->>T: Trigger: handle_new_user()
    T->>DB: Insert into user_profiles
    T->>DB: Set user_type = 'student' (default)
    
    alt User Type != 'student'
        F->>DB: Update user_type
    end
    
    alt User Type == 'student'
        F->>DB: Insert into students table
    end
    
    S->>U: Send confirmation email
    U->>S: Confirm email
    S->>F: Authentication complete
</lov-mermaid>

### 4. Inquiry System Flow

<lov-mermaid>
sequenceDiagram
    participant S as Student
    participant F as Frontend  
    participant DB as Database
    participant H as Host Family
    participant N as Notifications

    S->>F: Send connection request
    F->>DB: Verify student authentication
    F->>DB: Get student ID from profiles
    F->>DB: Insert inquiry (student_id, family_id, message)
    DB->>N: Notify family of new inquiry
    
    H->>F: View dashboard
    F->>DB: Fetch family inquiries
    DB->>F: Return inquiry list
    F->>H: Display pending requests
    
    H->>F: Accept/Decline inquiry
    F->>DB: Update inquiry status
    DB->>N: Notify student of response
    N->>S: Status update notification
</lov-mermaid>

### 5. System Architecture Overview

<lov-mermaid>
graph TD
    A[User Browser] --> B[React Frontend]
    B --> C[React Router]
    B --> D[TanStack Query]
    B --> E[Auth Context]
    
    E --> F[Supabase Auth]
    D --> G[Supabase Client]
    
    F --> H[PostgreSQL Database]
    G --> H
    H --> I[RLS Policies]
    H --> J[Database Triggers]
    
    K[Admin Dashboard] --> G
    L[Student Dashboard] --> G
    M[Family Dashboard] --> G
    
    N[File Storage] --> G
    O[Real-time Subscriptions] --> G
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style H fill:#e8f5e8
    style F fill:#fff3e0
</lov-mermaid>

## Key Components Architecture

### Authentication System
- **Role-based access control** with three user types: `student`, `host_family`, `admin`
- **Database triggers** automatically create user profiles on signup
- **Row Level Security (RLS)** policies protect user data
- **Supabase Auth** handles email verification and session management

### Inquiry Management
- **Real-time connection requests** between students and families
- **Status tracking** system: `pending` → `accepted`/`declined`
- **Bi-directional messaging** with family response capabilities
- **Dashboard integration** for both user types

### Data Security
- **RLS policies** ensure users can only access their own data
- **Authenticated API calls** with automatic session validation
- **Database triggers** prevent direct client-side profile insertion
- **Type-safe database operations** with generated TypeScript types

## Development Workflow

### Local Development Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

### Using Lovable Platform

Simply visit the [Lovable Project](https://lovable.dev/projects/8b93df0c-9e39-44ec-98cf-aec49d5a5278) and start prompting. Changes made via Lovable will be committed automatically to this repo.

## Deployment & Domain Setup

### Quick Deployment
Simply open [Lovable](https://lovable.dev/projects/8b93df0c-9e39-44ec-98cf-aec49d5a5278) and click on Share → Publish.

### Custom Domain
To connect a custom domain, navigate to Project → Settings → Domains and click Connect Domain.
Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Future Development Roadmap

### Phase 1 Enhancements
- [ ] **Real-time messaging system** with chat functionality
- [ ] **Advanced search filters** (price range, amenities, dietary preferences)
- [ ] **Photo upload system** for user profiles
- [ ] **Review and rating system** for completed stays

### Phase 2 Features
- [ ] **Payment integration** for booking deposits
- [ ] **Calendar system** for availability management
- [ ] **Multi-language support** expansion
- [ ] **Mobile app** development

### Phase 3 Advanced Features
- [ ] **AI-powered matching** algorithm
- [ ] **Video call integration** for virtual tours
- [ ] **Contract management** system
- [ ] **Background verification** services

## Database Migrations Reference

Key database objects created:
- `handle_new_user()` function for automatic profile creation
- Comprehensive RLS policies for data protection
- Foreign key relationships between users, profiles, students, families, and inquiries
- Optimized indexes for query performance

## Contributing & Maintenance

### Code Structure
- **Components**: Reusable UI components following atomic design principles
- **Pages**: Route-specific page components with business logic
- **Hooks**: Custom React hooks for state management and API calls
- **Types**: TypeScript definitions auto-generated from Supabase schema

### Design System
- **Semantic color tokens** defined in `index.css` and `tailwind.config.ts`
- **Consistent component variants** using class-variance-authority
- **Responsive design** with mobile-first approach
- **Dark/light mode support** through CSS custom properties

---

## Technical Notes

- **Authentication**: Supabase handles user sessions with automatic token refresh
- **Real-time Updates**: TanStack Query provides optimistic updates and cache management  
- **Type Safety**: Full TypeScript integration with Supabase generated types
- **Performance**: Image optimization and lazy loading implemented throughout
- **SEO**: Semantic HTML structure with proper meta tags and structured data
