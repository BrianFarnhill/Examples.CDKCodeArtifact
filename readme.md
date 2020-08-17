# Examples.CDKCodeArtifact

This repo is designed how to demonstrate the process of creating a re-usable CDK construct, and then
sharing it via a CodeArtifact repo.

## Prerequisistes

Before running this demo ensure that the following has been set up:

1. AWS CLI 2.0.21 or higher (this version adds support for CodeArtifact)
2. NPM 6.14 installed (should work with earlier versions but I've only tested with this)
3. A CodeArtifact repository that has NPM set up as an upstream repo (see the
   [Getting Started](https://docs.aws.amazon.com/codeartifact/latest/ug/getting-started.html)
   guide for info)

## Configuring CodeArtifact repo

After you have your repo set up, log in to it and set your local machine to use it instead of the
main NPM public store.

```bash
aws codeartifact login --tool npm --repository [REPO] --domain [DOMAIN] --domain-owner [ACCOUNT_ID]
```

> Note: while you have this configured all of your NPM calls will go to CodeArtifact. If this is not
your desired configuration be sure to remove this configuration at the end of the exercise.

## Publishing the construct

The "construct" package (at ./packages/construct) is an example CDK construct to test with. To
publish a new version of the package to CodeArtifact run these commands:

```bash
cd packages/construct
npm run build
npm publish
```

For demo purposes you may wish to make a change to the package and increment the version number. You
will then see multiple versions in CodeArtifact when you search for it.

## Using the shared construct

With CodeArtifact configured, you can install the package using the standard ``npm install``
command. In this case I have scoped the package to make it obvious that it is a custom one I have
created.

```bash
cd packages/stack
npm install @brfarn/construct --save
```

Once that is done you can use this like any other CDK construct:

```node
import * as brfarn from '@brfarn/construct'

...

new brfarn.Construct(this, "TestConstruct", {})
```

The test in the stack package has a snapshot in it that helps verify that the stack generates with
the correct resources. Run ``npm test`` to execute the tests and validate that the output is as
expected.

## Clean up

To cleanup after reviewing this configuration, simply remove the ``.npmrc`` file that was created
when you logged in to CodeArtifact via the cli.

```bash
rm ~/.npmrc
```

If you deployed the stack solution, be sure to remove it as well.
