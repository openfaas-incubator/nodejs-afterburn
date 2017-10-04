For use with [AfterBurn](https://blog.alexellis.io/openfaas-serverless-acceleration/) 0.1 in OpenFaaS repo.

Update CLI:

```
$ curl -sL cli.openfaas.com| sudo sh
```

Checkout patch and build:

```
$ git pull https://github.com/openfaas/faas/pulls && \
  cd faas && \
  git checkout afterburn_01 && \
  cd watchdog && \
  ./build.sh
```

Clone this repo in place:

```
$ git clone https://github.com/alexellis/nodejs-afterburn && \
  cd nodejs-afterburn && \
  git checkout 0.2 && \
  cp ../fwatchdog ./template/node
```

Build/deploy/run:

```
$ faas-cli build -f faster.yml && \
  faas-cli deploy -f faster.yml && \
  sleep 2 && \
  for i in {0..50} ; do time echo test-values-go-here | time faas-cli invoke --name faster -f faster.yml && echo ; done
```

### Limitations:

Large payloads are not buffered and will break the protocol - so if you use the README file for the watchdog that's generally big enough to prove the point. Smaller payloads will have no issues.
