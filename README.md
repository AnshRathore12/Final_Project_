# TalentFlow - Modern Hiring Platform 🚀

A comprehensive, modern hiring management system built with React, Vite, and Tailwind CSS. TalentFlow streamlines the entire recruitment process from job posting to candidate onboarding with an intuitive, responsive interface.

## ✨ Features

### 🎯 Core Functionality
- **Job Management**: Create, edit, and manage job postings with detailed requirements and specifications
- **Candidate Tracking**: Comprehensive candidate profiles with experience, education, and skills tracking
- **Assessment System**: Create and manage technical, behavioral, and cognitive assessments
- **Visual Pipeline**: Drag-and-drop Kanban board for managing candidates through hiring stages
- **Bulk Operations**: Efficiently manage multiple candidates simultaneously
- **Real-time Analytics**: Track hiring metrics and candidate progression

### 🎨 User Experience
- **Modern UI/UX**: Clean, intuitive interface with gradient designs and smooth animations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Ready**: Built with modern design principles
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Accessibility**: WCAG compliant design patterns

### 🔧 Technical Features
- **Mock API**: Complete MirageJS mock server for development and testing
- **Type Safety**: TypeScript components for enhanced development experience
- **State Management**: React Query for efficient data fetching and caching
- **Form Handling**: Robust form validation and submission
- **Error Handling**: Comprehensive error boundaries and toast notifications

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anshrathore/Final-Project.git
   cd Final-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **React Hot Toast** - Elegant toast notifications
- **CSS3** - Modern animations and transitions

### State Management & Data
- **React Query (@tanstack/react-query)** - Server state management
- **MirageJS** - Mock API server for development
- **React Hooks** - Local state management

### Development Tools
- **TypeScript** - Type safety (partial implementation)
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **DND Kit** - Drag and drop functionality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AssessmentBuilder.jsx
│   ├── CandidateForm.jsx
│   ├── KanbanColumn.jsx
│   ├── Layout.jsx
│   └── ...
├── pages/              # Main application pages
│   ├── HomePage.jsx
│   ├── JobsPage.jsx
│   ├── CandidatesPage.jsx
│   ├── PipelinePage.jsx
│   └── AssessmentsPage.jsx
├── hooks/              # Custom React hooks
│   ├── useJobs.js
│   ├── useCandidates.js
│   └── useAssessments.js
├── lib/                # Utility functions
├── mocks/              # Mock data and API handlers
├── services/           # API service functions
└── types/              # TypeScript type definitions
```

## 🎯 Key Features Deep Dive

### Job Management
- Create job postings with detailed requirements
- Track application metrics
- Manage job status (active, draft, archived)
- Tag-based categorization

### Candidate Pipeline
- Visual Kanban board with drag-and-drop
- Stages: Applied → Screening → Technical → Interview → Offer → Hired
- Bulk candidate operations
- Timeline tracking for each candidate

### Assessment System
- Create custom technical assessments
- Multiple question types (multiple choice, coding, essay)
- Automatic scoring and evaluation
- Assessment analytics

### Analytics Dashboard
- Real-time hiring metrics
- Candidate flow visualization
- Performance tracking
- Export capabilities

## 🚀 Deployment

### Deploying to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Render Configuration**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Branch**: `main`
   - **Root Directory**: Leave empty or use `.`

3. **Environment Variables** (if needed)
   - Set any required environment variables in Render dashboard

### Other Deployment Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Configure with GitHub Actions

## 🔧 Development

### Adding New Features

1. **Create a new component**
   ```bash
   touch src/components/NewComponent.jsx
   ```

2. **Add routing** (if needed)
   ```javascript
   // In App.jsx
   <Route path="/new-feature" element={<NewFeature />} />
   ```

3. **Create custom hooks** for data management
   ```javascript
   // In src/hooks/useNewFeature.js
   export function useNewFeature() {
     // Custom hook logic
   }
   ```

### Mock API Development

The project uses MirageJS for mock API. To add new endpoints:

1. **Define models** in `src/server.js`
2. **Add routes** in the routes function
3. **Create factories** for data generation

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Heroicons** for beautiful icons
- **MirageJS** for seamless mock API development

## 📞 Support

For support, email anshrathore30@gmail.com or create an issue in the GitHub repository.

---

**Made with ❤️ by [Ansh Rathore](https://github.com/anshrathore)**

## Project Structure

```plaintext
src
├── assets          # Asset files like images and fonts
├── components      # Reusable components
├── hooks           # Custom React hooks
├── pages           # Page components for routing
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/YourFeature`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
