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

  return (
    <div className="p-4">
      <form onSubmit={(e) => submit(e)} className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="font-semibold">
          {t('contact.name')}{' '}
          <span className="text-red-600 font-normal">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          className="border px-2 py-1 disabled:bg-slate-200 text-sm"
          disabled={inputDisabled}
          value={name}
          required
          placeholder={t('contact.namePlaceholder')}
          maxLength={maxLength}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="contact-email" className="font-semibold">
          {t('contact.contact')}{' '}
          <span className="text-red-600 font-normal">*</span>
        </label>
        <input
          id="contact-email"
          type="text"
          disabled={inputDisabled}
          className="border px-2 py-1 disabled:bg-slate-200 text-sm"
          value={email}
          required
          maxLength={maxLength}
          placeholder={t('contact.contactPlaceholder')}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="contact-message" className="font-semibold">
          {t('contact.message')}{' '}
          <span className="text-red-600 font-normal">*</span>
        </label>
        <textarea
          id="contact-message"
          className="border px-2 py-1 disabled:bg-slate-200 text-sm"
          disabled={inputDisabled}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          placeholder={t('contact.messagePlaceholder')}
          maxLength={maxMessageLength}
        />
        <span className="text-xs text-gray-400">
          {message.length}/{maxMessageLength}
        </span>

        <div>
          <button
            type="submit"
            disabled={inputDisabled}
            className="disabled:bg-slate-600 bg-sky-800 py-2 px-4 rounded-sm text-white"
          >
            {t('button.submit')}
          </button>
        </div>

        {statusMessage && (
          <span
            className={`text-xs ${
              status === ContactStatus.ERROR ? 'text-red-800' : ''
            }`}
          >
            {statusMessage}
          </span>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
