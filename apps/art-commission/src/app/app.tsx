import { CommissionClient } from '@commission-site/commission-client';
import { environment } from '../environments/environment';
import { Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './landing/landing-page';
import { useEffect, useState } from 'react';
import { CommissionMeta } from '@commission-site/commission-shared';
import { ContactPage } from './contact/contact-page';

const client = new CommissionClient(environment.commisionApi);

export function App() {
  const [meta, setCommissionmeta] = useState(null as CommissionMeta | null);

  useEffect(() => {
    client
      .getCommissionMeta()
      .then((meta) => setCommissionmeta(meta))
      .catch(() => setCommissionmeta(null));
  }, []);

  return (
    <div className="bg-slate-900 flex grow flex-col items-center p-4 h-full">
      <div className="flex flex-col w-full md:w-1/2 bg-white rounded-md">
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage meta={meta} />} />
            <Route
              path="request"
              element={meta && <ContactPage client={client} meta={meta} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
