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
      {/* Frame Size
      <ul>
        <li>Profile</li>
        <li>Half Body</li>
        <li>Full Body</li>
      </ul>
      Level of Detail
      <ul>
        <li>Line Art</li>
        <li>Simple Color</li>
        <li>Illustration</li>
      </ul> */}
      <div className="p-4">
        <ul className="list-disc list-inside leading-10">
          <li>
            I usually finish the drawing in 1-2 weeks but I cannot guarantee it
          </li>
          <li>Commissions are for personal-use only</li>
        </ul>

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
              <p className="text-xs text-slate-500">
                only accept fanart of existing characters right now.
                <p>I don't take rush orders.</p>
              </p>
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
              Approved and Paid
              <p className="text-xs text-slate-500">
                full payment upfront via Paypal, refund only max 50%
              </p>
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
              <p className="text-xs text-slate-500">
                revisions and cancellation discussable, but not after
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success">
                <CheckCircleOutline />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              Deliver final PNG
              <p className="text-xs text-slate-500">usually in A4 size</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
