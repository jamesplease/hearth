FROM mhart/alpine-node:10 as base
WORKDIR /usr/src
COPY package.json /usr/src/
RUN yarn install
COPY . .
RUN yarn build && yarn --production

FROM mhart/alpine-node:base-10
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 5000
CMD ["node", "server/index.js"]