Node.js AfterBurn language template
==========================================

## Usage

With `of-watchdog`

Build/deploy/run:

```
faas-cli template pull https://github.com/openfaas/nodejs-afterburn
faas-cli new --lang node-afterburn burner

faas-cli build -f burner.yml
faas-cli deploy -f burner.yml
echo test | faas-cli invoke burner
```
## What is afterburn?

The Function Watchdog offers a second mode called: [AfterBurn](https://blog.alexellis.io/openfaas-serverless-acceleration/). AfterBurn is where we fork your process once then keep it around for subsequent requests meaning that you can make your functions run faster.

## Previous version:

For previous version of instructions found in the 0.1 PR checkout the 0.3 tag.
