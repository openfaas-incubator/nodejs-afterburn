For use with AfterBurn 0.1 in OpenFaaS repo.

Checkout patch and build:

```
$ git pull https://github.com/openfaas/faas/pulls && \
  cd faas && \
  git checkout afterburn_01 && \
  cd watchdog && \
  ./build.sh
```

Now create a Dockerfile:

```
$ faas-cli new faster --lang node
```

* Edit faster/Dockerfile and remove the line that fetches the watchdog.

```
# Alternatively use ADD https:// (which will not be cached by Docker builder)
RUN apk --no-cache add curl \ 
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas/faas/releases/download/0.6.1/fwatchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && apk del curl --no-cache
```

* Copy in the local version of the fwatchdog with `COPY fwatchdog /usr/local/bin/`

```
COPY fwatchdog /usr/local/bin/
RUN chmod +x /usr/local/bin/fwatchdog
```

* Replace the "template/node" files with what you find in this repo.

```
$ git clone https://github.com/alexellis/nodejs-afterburn && \
  cp -r nodejs-afterburn/* ./template/node/
```

Build/deploy/run:

```
$ faas-cli build -f faster.yml && \
  faas-cli deploy -f faster.yml
$ echo test-values-go-here | faas-cli invoke faster -f faster.yml
```
