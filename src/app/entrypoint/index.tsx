import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from '~/pages/main';
import '../styles/global.css';

const root = document.getElementById('root');

if (root === null) {
  throw new Error('no root found');
}

createRoot(root).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
