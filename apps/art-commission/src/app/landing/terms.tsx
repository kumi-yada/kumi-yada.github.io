import { CardHeader } from '../components/card-header';
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

export function Terms() {
  return (
    <div>
      <CardHeader backTo="/">Terms of Service</CardHeader>
      <div className="p-4">
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
                <li>only accept fanart of existing characters right now.</li>
                <li>I don't take rush orders.</li>
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
                <li>full payment upfront via Paypal</li>
                <li>refund only max 50%</li>
              </ul>
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
                <li>revisions and cancellation discussable</li>
                <li>no major changes after sketch approved</li>
              </ul>
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
              </ul>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
