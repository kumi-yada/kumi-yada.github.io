import { CommissionClient } from '@commission-site/commission-client';
import {
  CommissionMeta,
  CommissionStatus,
  RequestStatus,
} from '@commission-site/commission-shared';
import { useEffect, useState } from 'react';
import { CardHeader } from '../components/card-header';
import CommissionStatusMessage from '../components/commission-status';
import ContactForm, { ContactFormValue } from './contact-form';
import { RequestStatusMessage } from './request-status';

const COMMISSION_ID_KEY = 'kumi-commission-request-id';
interface ContactPageProps {
  client: CommissionClient;
  meta: CommissionMeta;
}

export function ContactPage({ client, meta }: ContactPageProps) {
  const [status, setStatus] = useState(null as CommissionStatus | null);
  const [requestId, setRequestId] = useState(
    localStorage.getItem(COMMISSION_ID_KEY)
  );

  const updateStatus = async (id = requestId) => {
    let status = null;
    if (id) {
      try {
        status = await client.getCommissionStatus(id);
      } catch (e) {
        console.warn('Failed to get commission status of last request');
      }
    }

    setStatus(status);
  };

  const sendContact = async (contact: ContactFormValue) => {
    const id = await client.sendContactMessage(contact);
    setRequestId(id);
    localStorage.setItem(COMMISSION_ID_KEY, id);

    updateStatus(id);
  };

  const finishedStatus = [RequestStatus.REJECTED, RequestStatus.DELIVERED];
  const canRequest =
    meta.commissionOpen &&
    (!requestId || (status && finishedStatus.includes(status.status)));

  useEffect(() => {
    updateStatus();
  }, []);

  return (
    <div>
      <CardHeader backTo="/">Request Commission</CardHeader>

      <CommissionStatusMessage meta={meta} />

      {status && <RequestStatusMessage status={status} />}

      <ContactForm onSubmit={sendContact} disabled={!canRequest} />
    </div>
  );
}
