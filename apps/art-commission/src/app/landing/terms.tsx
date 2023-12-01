import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {
  ReviewsOutlined,
  CheckCircleOutline,
  Payment,
  MoveToInbox,
} from '@mui/icons-material';
import { CardHeader } from '../components/card-header';
import { useTranslation } from 'react-i18next';

export function TermsPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-between grow">
      <CardHeader backTo="../">{t('landing.tos')}</CardHeader>
      <div className="py-4 grow">
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <MoveToInbox />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Request
              <ul className="text-xs text-slate-500 list-disc list-inside">
                <li>for personal-use</li>
                <li>commercial negotiable</li>
                <li>no rush orders</li>
              </ul>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <Payment />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Payment
              <ul className="text-xs text-slate-500 list-disc list-inside">
                <li>only accepting PayPal</li>
                <li>50% payment upfront</li>
                <li>I will be sending the invoice to you</li>
                <li>only after receiving, I will start drawing</li>
              </ul>
              <img src="/assets/invoice.png" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <ReviewsOutlined />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Review Sketch
              <ul className="text-xs text-slate-500 list-disc list-inside">
                <li>Colored sketch for one feedback round</li>
                <li>no major changes after sketch approved</li>
              </ul>
              <img src="/assets/color-sketch.png" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success">
                <CheckCircleOutline />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              Deliver
              <ul className="text-xs text-slate-500 list-disc list-inside">
                <li>usually within 1-2 weeks but no guarantee</li>
                <li>final PNG in A4 size</li>
                <li>All Rights Reserved.</li>
              </ul>
              <img src="/assets/final.png" />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>

      <CardHeader backTo="../">{t('landing.tos')}</CardHeader>
    </div>
  );
}
