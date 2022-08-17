import { CommissionClient } from '@commission-site/commission-client';
import { environment } from '../environments/environment';
import { Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './landing/landing-page';
import AdminPage from './admin-page/admin-page';

const client = new CommissionClient(environment.commisionApi);

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage client={client} />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
