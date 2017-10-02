For use with AfterBurn 0.1 in OpenFaaS repo.

Checkout patch and build:

```
$ git pull https://github.com/openfaas/faas/pulls && \
  cd faas && \
  git checkout afterburn_01 && \
  cd watchdog && \
  ./build_redist.sh
```

Now create a Dockerfile:

```
$ faas-cli new faster --lang node
```

* Edit faster/Dockerfile and remove the line that fetches the watchdog.

* Copy in the local version of the fwatchdog with `COPY fwatchdog /usr/local/bin/`

* Replace the "template/node" files with what you find in this repo.

Build/deploy/run:

```
$ faas-cli build -f faster.yml && \
  faas-cli deploy -f faster.yml
$ echo test-values-go-here | faas-cli invoke -f faster.yml
```
