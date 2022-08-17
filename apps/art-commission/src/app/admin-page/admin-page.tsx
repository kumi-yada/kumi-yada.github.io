import { CommissionClient } from '@commission-site/commission-client';
import { FormEvent, useEffect, useState } from 'react';
import { environment } from '../../environments/environment';
import { AuthService } from './auth-client';

const auth = new AuthService({
  clientId: 'osd6kdf9ur58ohmcmvk1nh2jb',
  domain: 'kumi-arts',
  tokenKey: 'kumi-arts-login-token',
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminPageProps {}

export function AdminPage(props: AdminPageProps) {
  auth.handleAuthCallback();

  if (!auth.isAuthenticated()) {
    auth.login('admin');
  }

  const [commissionOpen, setCommissionOpen] = useState(false);
  const [maxSlots, setMaxSlots] = useState(3);
  const [filledSlots, setFilledSlots] = useState(0);
  const [status, setStatus] = useState('');

  const client = new CommissionClient(
    environment.commisionApi,
    auth.getToken()
  );

  useEffect(() => {
    client.getCommissionMeta().then((meta) => {
      setCommissionOpen(meta.commissionOpen);
      setMaxSlots(meta.maxSlots || 3);
      setFilledSlots(meta.filledSlots || 0);
    });
  }, []);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('');
    const response = await client.postCommissionMeta({
      commissionOpen,
      maxSlots,
      filledSlots,
    });
    if (response.status === 200) {
      setStatus('Saved');
    } else {
      setStatus(await response.json());
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitForm}>
        <div className="form-row inline">
          <input
            id="commissionOpen"
            type="checkbox"
            checked={commissionOpen}
            onChange={(e) => setCommissionOpen(e.target.checked)}
          />
          <label htmlFor="commissionOpen">Commission Open</label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <label htmlFor="commissionOpen">Slots</label>
          <input
            className="w-16"
            type="number"
            min="0"
            max={maxSlots}
            value={filledSlots}
            onChange={(e) => setFilledSlots(parseInt(e.target.value))}
          />
          /
          <input
            className="w-16"
            type="number"
            min="0"
            value={maxSlots}
            onChange={(e) => setMaxSlots(parseInt(e.target.value))}
          />
        </div>

        <div className="form-row inline">
          <button type="submit">Save</button>
          <div className="status">{status}</div>
        </div>
      </form>
    </div>
  );
}

export default AdminPage;
