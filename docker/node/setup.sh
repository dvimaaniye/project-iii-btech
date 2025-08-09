#!/bin/sh

pnpm install --frozen-lockfile
pnpm run prisma:dev --name init
