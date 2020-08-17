import * as cdk from '@aws-cdk/core';
import * as brfarn from '@brfarn/construct'

export class StackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    new brfarn.Construct(this, "TestConstruct", {})
  }
}
