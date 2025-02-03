import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MainPage } from '~/pages/main';
import { Toaster } from '~/shared/ui/sonner';
import { store } from '../store';
import '../styles/global.css';

const root = document.getElementById('root');

if (root === null) {
  throw new Error('no root found');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <MainPage />
      <Toaster
        position="top-right"
        richColors
      />
    </Provider>
  </StrictMode>
);
