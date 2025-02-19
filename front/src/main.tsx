import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { paths } from './constants'
import { Home, Login, Register, ErrorPage, Resource } from './pages'
import { Information } from './pages/Information'
import { AddResource } from './pages/AddResource'
import { AuthProvider } from './context/AuthProvider'

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: paths.login,
    element: <Login />,
  },
  {
    path: paths.register,
    element: <Register />,
  },
  {
    path: paths.resource,
    element: <Resource />,
  },
  {
    path: paths.information,
    element: <Information />,
  },
  {
    path: 'add-resource',
    element: <AddResource />,
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
