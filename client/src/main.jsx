import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App';
import ScrollToTop from './components/common/ScrollToTop';

import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

import './index.css';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      <AuthProvider>
        <ChatProvider>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#171717',
                color: '#fafafa',
                border:
                  '1px solid rgba(212,175,55,0.2)',
              },
            }}
          />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);