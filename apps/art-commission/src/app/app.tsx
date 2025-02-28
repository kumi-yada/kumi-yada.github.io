import { Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './landing/landing-page';
import { PricesPage } from './landing/prices';
import { TermsPage } from './landing/terms';

// const client = new CommissionClient(environment.commisionApi);

export function App() {
  // const [meta, setCommissionmeta] = useState(null as CommissionMeta | null);

  // useEffect(() => {
  //   client
  //     .getCommissionMeta()
  //     .then((meta) => setCommissionmeta(meta))
  //     .catch(() => setCommissionmeta(null));
  // }, []);

  return (
    <div className="bg-zinc-100 flex grow flex-row justify-center h-full sm:p-16">
      <div className="flex flex-col bg-white grow max-w-3xl relativ sm:rounded">
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
