import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';

// Attach the current Supabase access token to same-origin API requests.
const originalFetch = window.fetch.bind(window);
window.fetch = async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const requestUrl = input instanceof Request ? input.url : String(input);
  if (requestUrl.startsWith('/api/')) {
    const client = (window as any).__RM_SUPABASE__;
    if (client) {
      const { data } = await client.auth.getSession();
      const headers = new Headers(init.headers || (input instanceof Request ? input.headers : undefined));
      if (data.session?.access_token) headers.set('Authorization', `Bearer ${data.session.access_token}`);
      init = { ...init, headers };
    }
  }
  return originalFetch(input, init);
};
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
