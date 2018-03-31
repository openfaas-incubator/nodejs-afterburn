Node.js AfterBurn language template
==========================================

## Status

AfterBurn is in incubation under the [of-watchdog project](https://github.com/openfaas-incubator/of-watchdog). It is due to be deprecated by the HTTP mode for the of-watchdog. 

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
