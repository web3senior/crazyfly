import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
import Loading from './routes/components/LoadingSpinner'
const Layout = lazy(() => import('./routes/layout.jsx'))
import Level from './routes/level.jsx'
import New from './routes/new.jsx'
import Home, { loader as homeLoader } from './routes/home.jsx'
import Play, { loader as playLoader } from './routes/play.jsx'
import About from './routes/about.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home title={`Home`} />,
      },
      {
        path: 'play/:levelId',
        loader: playLoader,
        element: <Play title={`Play`} />,
      },
      {
        path: 'new',
        element: <New title={`New`} />,
      },
      {
        path: 'level',
        element: <Level title={`Level`} />,
      },
      {
        path: 'about',
        element: <About title={`About`} />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
