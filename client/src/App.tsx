
import Login from './auth/Login'
import Signup from './auth/Signup'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'

import MainLayout from './layout/MainLayout'
import HeroSection from './components/HeroSection'

import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestaurantDetail from './components/RestaurantDetail'
import Cart from './components/Cart'
import Restaurant from './admin/Restaurant'
import AddMenu from './admin/AddMenu'
import EditMenu from './admin/EditMenu'


const appRouter=createBrowserRouter([ 
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:'/',
        element:<HeroSection/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/search/:text',
        element:<SearchPage/>
      },
      {
        path:'/restaurant/:text',
        element:<RestaurantDetail/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      //admin service starts from here
      {
        path:'/admin/restaurant',
        element:<Restaurant/>
      },
      {
        path:'/admin/menu',
        element:<AddMenu/>
      },
      {
        path:'/admin/editmenu',
        element:<EditMenu />
      },

    ]
  
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword/>
  },
  {
    path:'/reset-password',
    element:<ResetPassword/>
  }
])



function App() {


  return (
    
         <main>
          <RouterProvider router={appRouter}>
          <Login/>
          </RouterProvider>
    
    </main>
      
    
  )
}

export default App
