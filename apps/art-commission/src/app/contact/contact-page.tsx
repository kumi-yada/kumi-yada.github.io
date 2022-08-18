import { CommissionClient } from '@commission-site/commission-client';
import { CommissionMeta } from '@commission-site/commission-shared';
import CommissionStatus from '../components/commission-status';
import ContactForm, { ContactFormValue } from './contact-form';

interface ContactPageProps {
  client: CommissionClient;
  meta: CommissionMeta;
}

export function ContactPage({ client, meta }: ContactPageProps) {
  const sendContact = async (contact: ContactFormValue) => {
    await client.sendContactMessage(contact);
  };

  return (
    <div>
      <CommissionStatus meta={meta} />

      <ContactForm
        onSubmit={sendContact}
        disabled={!meta.commissionOpen || meta.filledSlots >= meta.maxSlots}
      />
    </div>
  );
}
