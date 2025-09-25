import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import { makeServer } from './server'
import { seedData } from './lib/database'

// Initialize database and seed data only if empty
seedData().then(async () => {
  console.log('Database seeding completed');
  
  // Start Mirage server in development AFTER database seeding
  console.log('Environment check - import.meta.env.DEV:', import.meta.env.DEV);
  console.log('Environment check - NODE_ENV:', import.meta.env.NODE_ENV);
  console.log('Environment check - MODE:', import.meta.env.MODE);
  
  // Force MirageJS to start (removing environment check temporarily)
  console.log('Starting MirageJS server...');
  try {
    const server = makeServer({ environment: 'development' });
    console.log('MirageJS server started successfully');
    console.log('MirageJS server object:', server);
  } catch (error) {
    console.error('Error starting MirageJS server:', error);
  }
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </React.StrictMode>,
  )
}).catch(error => {
  console.error('Failed to initialize database:', error);
  
  // Render app anyway to avoid complete failure
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </React.StrictMode>,
  )
});
