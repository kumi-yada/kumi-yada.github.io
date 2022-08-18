import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import { HttpApi, HttpMethod, CorsHttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { Runtime, Code, Function } from '@aws-cdk/aws-lambda';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { join } from 'path';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, 'commissionApi', {
      corsPreflight: {
        allowOrigins: ['http://localhost:4200', 'https://kumi-yada.github.io'],
        allowHeaders: ['Authorization'],
        allowMethods: [CorsHttpMethod.ANY],
        allowCredentials: true,
      },
    });

    const lambdaFolder = '../../dist/libs/lambda';

    const contactFunction = new Function(this, 'commissionContact', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(lambdaFolder, 'commission-contact')),
      handler: 'lambda-commission-contact.handler',
      logRetention: RetentionDays.ONE_MONTH,
    });

    const ssmTrelloRead = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['ssm:GetParameter'],
      resources: ['arn:aws:ssm:eu-central-1:841152197398:parameter/trello_*'],
    });
    contactFunction.addToRolePolicy(ssmTrelloRead);

    api.addRoutes({
      path: '/contact',
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration('postContact', contactFunction),
    });

    const getCommissionMetaFunction = new Function(this, 'getCommissionMeta', {
      functionName: 'GetCommissionMeta',
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(lambdaFolder, 'commission-meta')),
      handler: 'lambda-commission-meta.getHandler',
      logRetention: RetentionDays.ONE_MONTH,
    });
    getCommissionMetaFunction.addToRolePolicy(ssmTrelloRead);

    api.addRoutes({
      path: '/commission-meta',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'getCommissionMeta',
        getCommissionMetaFunction
      ),
    });

    const getCommissionStatus = new Function(this, 'getCommissionStatus', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(lambdaFolder, 'commission-status')),
      handler: 'lambda-commission-status.handler',
      logRetention: RetentionDays.ONE_MONTH,
    });
    getCommissionStatus.addToRolePolicy(ssmTrelloRead);

    api.addRoutes({
      path: '/commission-status/{id}',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        'getCommissionStatus',
        getCommissionStatus
      ),
    });

    contactFunction.addToRolePolicy(
      new PolicyStatement({
        actions: ['lambda:InvokeFunction'],
        resources: [getCommissionMetaFunction.functionArn],
      })
    );

    new CfnOutput(this, 'apiUrl', { value: api.url });
  }
}
