import { Routes , Route, Navigate } from 'react-router';
import LoginPage from "./pages/LoginPage";
import { useAuth } from '@clerk/clerk-react';
import DashBoardPage from './pages/DashBoardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import DashboardLayout from './layout/DashboardLayout';
import PageLoader from './components/PageLoader';

function App() {

  const {isSignedIn , isLoaded} = useAuth();

  if(!isLoaded) return <PageLoader/>;

  return  (
    <Routes> 
      <Route path="/login" element={ isSignedIn ? <Navigate to={'/dashboard'} /> : <LoginPage />} />
  
      <Route path='/' element={isSignedIn ? <DashboardLayout /> : < Navigate to={'/login'} />} >
        <Route index element={<Navigate to = {'dashboard'} />} />
        <Route path='dashboard' element={<DashBoardPage/>} />
        <Route path='products' element={<ProductsPage/>} />
        <Route path='orders' element={<OrdersPage/>} />
        <Route path='customers' element={<CustomersPage/>} />
      </Route>

  </Routes>
  );
  
}

export default App
