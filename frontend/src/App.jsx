import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RecurringTransactions from './pages/RecurringTransactions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <div className="App bg-brand-900 min-h-screen">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          },
        }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/recurring' element={<RecurringTransactions />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
