# Avatrr - Professional Portfolio & AI Twin Platform

A comprehensive Next.js application that helps professionals create ATS-optimized resumes, build stunning portfolios, deploy AI digital twins, find remote opportunities, and generate winning proposals.

## 🚀 Features

### Core Functionality
- **Resume Builder**: ATS-optimized resume creation with AI analysis and scoring
- **Portfolio Builder**: AI-powered portfolio customization with real-time chat interface
- **Job Opportunities**: Aggregated job search from multiple APIs with advanced filtering
- **Proposal Generator**: AI-powered proposal creation with optimization scoring
- **Digital Twin**: AI assistant for public profiles with personality customization
- **Analytics Dashboard**: Comprehensive performance tracking and insights

### Technical Features
- **Authentication**: Firebase Google Sign-in with username selection
- **Real-time Updates**: Live portfolio customization and chat interfaces
- **Responsive Design**: Mobile-first approach with smooth animations
- **AI Integration**: Gemini API for resume analysis and content generation
- **Modern UI**: shadcn/ui components with Framer Motion animations

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **AI**: Gemini API
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
/app
  /(auth)           # Authentication pages
  /dashboard        # Main dashboard and features
  /onboarding       # User onboarding flow
  /api             # API routes
  /[username]      # Public profile pages
/components
  /ui              # shadcn/ui components
  /landing         # Landing page components
  /dashboard       # Dashboard components
  /resume          # Resume builder components
  /portfolio       # Portfolio customization
  /jobs            # Job search components
  /proposals       # Proposal generator
  /digital-twin    # AI assistant components
  /analytics       # Analytics dashboard
/lib
  /firebase        # Firebase configuration
  /ai              # AI integration
  /jobs            # Job API clients
  /utils           # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- Gemini API key (optional for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/avatrr.git
cd avatrr
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Integration (Optional)
GEMINI_API_KEY=your_gemini_api_key

# Job APIs (Optional)
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
JSEARCH_API_KEY=your_jsearch_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication with Google provider
3. Create a Firestore database
4. Configure security rules (see `firestore.rules`)
5. Add your domain to authorized domains

### AI Integration
1. Get a Gemini API key from Google AI Studio
2. Add the key to your environment variables
3. AI features will work with mock data if no key is provided

### Job APIs
The platform supports multiple job APIs:
- **Adzuna API**: Primary job search
- **JSearch (RapidAPI)**: Tech-focused jobs
- **RemoteOK**: Remote positions

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Secondary**: Gray shades
- **Accents**: Blue, Green, Purple for status indicators

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: 12px - 48px scale
- **Weights**: 400, 500, 600, 700

### Components
- **Cards**: White background, subtle shadows
- **Buttons**: Black primary, outlined secondary
- **Inputs**: Clean borders with focus states
- **Animations**: Smooth Framer Motion transitions

## 📱 Features Overview

### Landing Page
- Hero section with value proposition
- Feature showcase with animations
- Call-to-action buttons
- Responsive design

### Authentication
- Google Sign-in integration
- Username selection with validation
- Onboarding flow

### Dashboard
- Overview with statistics
- Quick actions
- Recent activity
- Performance metrics

### Resume Builder
- Tabbed interface for sections
- Real-time editing
- ATS score analysis
- Export functionality

### Portfolio Customizer
- Live preview
- AI chat interface
- Real-time design changes
- Template system

### Job Opportunities
- Advanced filtering
- Multiple view modes
- Save functionality
- Proposal integration

### Proposal Generator
- AI-powered generation
- Optimization scoring
- Multiple variations
- Export options

### Digital Twin
- Personality configuration
- Knowledge management
- Chat widget
- Conversation logs

### Analytics
- Performance tracking
- Interactive charts
- Export functionality
- Insights dashboard

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Firebase](https://firebase.google.com/) for backend services
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

For support, email support@avatrr.com or join our Discord community.

---

Built with ❤️ by the Avatrr team