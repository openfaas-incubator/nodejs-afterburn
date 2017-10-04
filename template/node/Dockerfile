FROM node:6.11.2-alpine

# Alternatively use ADD https:// (which will not be cached by Docker builder)

COPY fwatchdog /usr/local/bin/
RUN chmod +x /usr/local/bin/fwatchdog

WORKDIR /root/

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

# Wrapper/boot-strapper
COPY package.json       .
RUN npm i

# Function
COPY index.js           .
RUN mkdir -p ./root/function

COPY function/*.json    ./function/
WORKDIR /root/function
RUN npm i || :
WORKDIR /root/
COPY function           function
WORKDIR /root/function

WORKDIR /root/

ENV cgi_headers="true"

ENV write_debug=true
ENV read_debug=true

ENV fprocess="node index.js"
ENV afterburn=true

HEALTHCHECK --interval=1s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
