import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {UserPool, Mfa} from 'aws-cdk-lib/aws-cognito'

export class NextAuthWithCognitoSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'SampleUserPool', {
      userPoolName: 'sample-user-pool',
      selfSignUpEnabled: true,
      mfa: Mfa.OPTIONAL,
      mfaSecondFactor: {
        sms: true,
        otp: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
      },
      signInAliases: { email: true },
      autoVerify: { email: true },
    })

    userPool.addClient('SampleUserPoolClient', {
      userPoolClientName: 'sample-user-pool-client',
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        callbackUrls: ['http://localhost:3000'],
      },
    })
  }
}
