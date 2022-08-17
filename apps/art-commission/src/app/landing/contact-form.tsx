import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ContactFormValue {
  name: string;
  email: string;
  message?: string;
}

export enum ContactStatus {
  SENT,
  ERROR,
}

export interface ContactFormProps {
  onSubmit?: (value: ContactFormValue) => Promise<void>;
  disabled?: boolean;
}

export function ContactForm({ onSubmit, disabled = false }: ContactFormProps) {
  const maxLength = 100;
  const maxMessageLength = 1000;

  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<ContactStatus | null>(null);

  const getStatusMessage = (status: ContactStatus | null) => {
    if (status == null) return '';

    if (status === ContactStatus.SENT) {
      return t('contact.status.sent');
    }

    return t('contact.status.error');
  };
  const statusMessage = getStatusMessage(status);

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      setSending(true);
      try {
        await onSubmit({
          email,
          name,
          message,
        });
        setStatus(ContactStatus.SENT);
        resetForm();
      } catch (e) {
        setStatus(ContactStatus.ERROR);
      }
      setSending(false);
    }
  };

  const inputDisabled = sending || disabled;

  // TODO: add validation
  return (
    <form className="form" onSubmit={(e) => submit(e)}>
      <div className="form-row">
        <label htmlFor="contact-name">{t('contact.name')} *</label>
        <input
          id="contact-name"
          type="text"
          disabled={inputDisabled}
          value={name}
          required
          maxLength={maxLength}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="contact-email">{t('contact.email')} *</label>
        <input
          id="contact-email"
          type="text"
          disabled={inputDisabled}
          value={email}
          required
          maxLength={maxLength}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="contact-message">{t('contact.message')} *</label>
        <textarea
          id="contact-message"
          className="resize-none"
          disabled={inputDisabled}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          maxLength={maxMessageLength}
        />
        <span className="status note">
          {message.length}/{maxMessageLength}
        </span>
      </div>

      <div className="form-row">
        <div>
          <button type="submit" disabled={inputDisabled}>
            {t('button.submit')}
          </button>
        </div>
      </div>

      {statusMessage && <span className="status">{statusMessage}</span>}
    </form>
  );
}

export default ContactForm;
