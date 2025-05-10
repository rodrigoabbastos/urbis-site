
import React from 'react'; // Import React for JSX support
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure the root element exists
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(React.createElement(App)); // Use React.createElement instead of JSX
} else {
  console.error("Root element not found");
}
