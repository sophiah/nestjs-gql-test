FROM     node:14.18.2 as builder
WORKDIR  /pkg

ENV IMDB_CONNSTR=""
ENV IMDB_DB=""
ENV IMDB_USER=""
ENV IMDB_PASS=""

ENV OTLP_ENDPOINT=""
ENV AUTHOR_SERVICE=""
ENV BOOK_SERVICE=""
ENV SPAN_EXPORTER=""
ENV AUTO_INTROMENT=""

COPY     package.json /pkg/
COPY     . .
RUN   npm i -g rimraf @nestjs/cli
RUN   rm -rf data .npmrc Dockerfile* .git
RUN      npm install \
      && npm run clean \
      && npm run build \
      && npm install --no-optional 
# removes all packages specified in the devDependencies section.
RUN      npm prune --production 

FROM     node:14.18.2-slim
WORKDIR  /app
RUN      groupadd app && useradd -g app app
# copy from build image
COPY     --chown=app:app --from=builder /pkg/node_modules /app/node_modules
COPY     --chown=app:app --from=builder /pkg/dist ./dist
USER     app
EXPOSE   8080
CMD      ["node", "dist/src/main.js"]