#!/bin/bash

NAME=$1

npm run build

npm run typeorm -- migration:generate -d dist/src/typeormconfig.js ./migration/$NAME