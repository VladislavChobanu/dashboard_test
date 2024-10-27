import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Users from './components/pages/Users';
import UsersList from './components/pages/UsersList';
import Dashboard from './components/pages/Dashboard';
import UserForm from './components/pages/UserForm';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement:  (<div>404</div>),
      children: [
        {path:'/', element: <Users />},
        {path:'/list', element: <UsersList />},
        {path:'/dashboard', element: <Dashboard />},
        {path:'/form', element: <UserForm />}
      ]
    }
  ])
  return <RouterProvider router={router} />;
}

export default App
