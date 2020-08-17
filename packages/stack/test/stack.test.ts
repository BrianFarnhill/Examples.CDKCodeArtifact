import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Stack from '../lib/stack-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Stack.StackStack(app, 'MyTestStack');
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
});
