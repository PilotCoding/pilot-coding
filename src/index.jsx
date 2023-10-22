import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import 'https://cdn.jsdelivr.net/pixi.js/3.0.7/pixi.js';
import './index.css';

createRoot(document.querySelector('main')).render(
  <RouterProvider router={router} />
);