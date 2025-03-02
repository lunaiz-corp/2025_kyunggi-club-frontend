FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY ./.next/standalone /usr/src/app

ENTRYPOINT [ "node", "apps/admin/server.js" ]
