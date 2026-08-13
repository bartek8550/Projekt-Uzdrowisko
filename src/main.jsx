import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (container.dataset.prerendered === 'true') {
  hydrateRoot(container, app, {
    onRecoverableError(error) {
      console.error('Błąd hydratacji prerenderowanej strony:', error);
    },
  });
} else {
  createRoot(container).render(app);
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => {});
  });
}
