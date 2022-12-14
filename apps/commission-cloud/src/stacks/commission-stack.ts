import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';

import { RetentionDays } from '@aws-cdk/aws-logs';
import { Runtime, Code, Function } from '@aws-cdk/aws-lambda';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const redditCommissionPost = new Function(this, 'redditCommissionPost', {
      environment: {
        REDDIT_CLIENT: process.env.REDDIT_CLIENT,
        REDDIT_SECRET: process.env.REDDIT_SECRET,
        REDDIT_USER: process.env.REDDIT_USER,
        REDDIT_PASSWORD: process.env.REDDIT_PASSWORD,
      },
      runtime: Runtime.PYTHON_3_9,
      code: Code.fromAsset('./src/lambda'),
      handler: 'reddit-commission.handler',
      logRetention: RetentionDays.ONE_MONTH,
    });

    const commissionRule = new Rule(this, 'commissionRule', {
      schedule: Schedule.cron({ minute: '0', hour: '0', weekDay: 'FRI' }),
      enabled: false,
    });
    commissionRule.addTarget(new LambdaFunction(redditCommissionPost));
  }
}
