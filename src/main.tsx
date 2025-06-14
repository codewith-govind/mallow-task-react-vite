// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; // The Redux store
import App from './App';
import { ThemeProviderWrapper } from './contexts/ThemeContext'; // Theme provider
import './global.css';

// Ensure you have Tailwind CSS loaded in your public/index.html via CDN:
// <script src="https://cdn.tailwindcss.com"></script>

const container = document.getElementById('root');

// Check if container is not null before creating root
if (!container) {
  throw new Error('Root element not found in the DOM.');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </Provider>
  </React.StrictMode>
);
