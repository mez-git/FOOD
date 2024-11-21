
import Login from './auth/Login';
import Signup from './auth/Signup';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';


import MainLayout from './layout/MainLayout';
import HeroSection from './components/HeroSection';

import Profile from './components/Profile';
import SearchPage from './components/SearchPage';
import RestaurantDetail from './components/RestaurantDetail';
import Cart from './components/Cart';
import Restaurant from './admin/Restaurant';
import AddMenu from './admin/AddMenu';


import Orders from './admin/Order';
import EditMenu from './admin/EditMenu';

import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';
import Loading from './components/Loading';
import Success from './components/Success';
import { useThemeStore } from './store/useThemeStore';



const ProtectedRoute=({children}:{children:React.ReactNode})=>{
  const {isAuthenticated}=useUserStore()
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  return children
}

const AuthenticatedUser=({children}:{children:React.ReactNode})=>{
  const {isAuthenticated,user}=useUserStore()
  if(isAuthenticated && user?.isVerified){
    return <Navigate to ="/" replace/>
  }
  return children
}
const AdminRoute=({children}:{children:React.ReactNode})=>{
  const {isAuthenticated,user}=useUserStore()
  if(!isAuthenticated ){
    return <Navigate to ="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to ="/" replace/>
  }
  return children
}
const appRouter = createBrowserRouter([
  {
    path: '/',
    element:<ProtectedRoute><MainLayout />,</ProtectedRoute> ,
    children: [
      {
        path: '/',
        element: <HeroSection />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/search/:text',
        element: <SearchPage />
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetail />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      
      {
        path: "/order/status",
        element: <Success />,
      },

      // Admin service starts from here
      {
        path: '/admin/restaurant',
        element: <AdminRoute><Restaurant /></AdminRoute>
      },
      {
        path: '/admin/menu',
        element:  <AdminRoute><AddMenu /></AdminRoute>
      },
   
      {

        path: '/admin/orders',
        element: <AdminRoute><Orders /></AdminRoute> 
      },
       
      {

        path: '/admin/editmenu',
        element:  <AdminRoute><EditMenu /></AdminRoute>
      }
    ]
  },
  {
    path: '/login',
    element:<AuthenticatedUser><Login /></AuthenticatedUser> 
  },
  {
    path: '/signup',
    element: <AuthenticatedUser><Signup /></AuthenticatedUser> 
  },

  
 

]);

function App() {
  const initializeTheme = useThemeStore((state:any) => state.initializeTheme);
  const {checkAuthentication,isCheckingAuth}=useUserStore()
  useEffect(()=>{
    checkAuthentication()
      initializeTheme();
  },[checkAuthentication])
  if(isCheckingAuth)return <Loading/>
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
