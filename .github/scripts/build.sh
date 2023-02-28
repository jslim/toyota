#!/bin/bash
set -e

#### Running build ####
export COMMIT_ID=$(git log --pretty="%h" --no-merges -1)
export COMMIT_DATE="$(git log --date=format:'%Y-%m-%d %H:%M' --pretty="%cd" --no-merges -1)"
export COMMIT_TIME="$(git log --pretty="%at" --no-merges -1)"

#### Print Environment Variables ####
printenv

rm -rf ./out

npm run build:static
