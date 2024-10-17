#!/bin/bash

npm run build

npm run typeorm -- -d dist/src/typeormconfig.js migration:run