import * as cdk from '@aws-cdk/core';
import { AppStack } from './stacks/commission-stack';

const app = new cdk.App();
new AppStack(app, 'commission-cloud');
