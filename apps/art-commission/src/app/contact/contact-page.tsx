import { CommissionClient } from '@commission-site/commission-client';
import { CommissionMeta } from '@commission-site/commission-shared';
import { useEffect, useState } from 'react';
import { CardHeader } from '../components/card-header';
import CommissionStatus from '../components/commission-status';
import ContactForm, { ContactFormValue } from './contact-form';

const COMMISSION_ID_KEY = 'kumi-commission-request-id';
interface ContactPageProps {
  client: CommissionClient;
  meta: CommissionMeta;
}

export function ContactPage({ client, meta }: ContactPageProps) {
  const [requestId, setRequestId] = useState(
    localStorage.getItem(COMMISSION_ID_KEY)
  );

  useEffect(() => {
    if (requestId) {
      localStorage.setItem(COMMISSION_ID_KEY, requestId);
    } else {
      localStorage.removeItem(COMMISSION_ID_KEY);
    }
  }, [requestId]);

  const sendContact = async (contact: ContactFormValue) => {
    const id = await client.sendContactMessage(contact);
    setRequestId(id);
  };

  return (
    <div>
      <CardHeader backTo="/">Request Commission</CardHeader>

      <CommissionStatus meta={meta} />

      <ContactForm
        onSubmit={sendContact}
        disabled={!meta.commissionOpen || meta.filledSlots >= meta.maxSlots}
      />
    </div>
  );
}
