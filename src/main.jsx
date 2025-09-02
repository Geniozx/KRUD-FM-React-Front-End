import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { UserProvider } from './contexts/UserContext.jsx';
import './index.css'
import './SongComponents.css'  
// added the above SongComponents.css
import App from './App.jsx'
import './CompleteStyles.css'

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
