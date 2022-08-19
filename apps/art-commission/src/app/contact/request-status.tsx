import {
  CommissionStatus,
  RequestStatus,
} from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';

interface RequestStatusMessageProps {
  status: CommissionStatus;
}

const statusText: { [x: string]: string } = {
  [RequestStatus.OPEN]:
    'Your request is still open. It will be reviewed as soon as possible.',
  [RequestStatus.REVIEWED]:
    'Your request has been reviewed. You will be contacted for further information about your request.',
  [RequestStatus.APPROVED]:
    'Your request has been approved and is awaiting payment.',
  [RequestStatus.IN_PROGRESS]:
    'Your request is paid and will be worked on as soon as possible.',
  [RequestStatus.REJECTED]: 'Your last request has been rejected.',
  [RequestStatus.DELIVERED]: 'Your last request has been delivered to you.',
};

export function RequestStatusMessage({ status }: RequestStatusMessageProps) {
  const { t } = useTranslation();
  const text = statusText[status.status];

  return (
    <div className="flex flex-col gap-2 p-4">
      <span>{text}</span>
      <span className="text-xs text-slate-500">{`${t('lastUpdate')} ${new Date(
        status.lastUpdated
      ).toLocaleString()}`}</span>
    </div>
  );
}
