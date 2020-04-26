#!/bin/bash

mkdir nodejs nodejs/node_modules nodejs/node_modules/banner
if test -f index.js; then
    cp index.js nodejs/node_modules/banner
    cp -r lib nodejs/node_modules/banner
else 
    cp ../bannerjs/index.js nodejs/node_modules/banner
    cp -r ../bannerjs/lib nodejs/node_modules/banner
fi
zip -r banner.zip nodejs >> /dev/null
ARN=$(aws lambda publish-layer-version \
    --layer-name "BannerJS" \
    --description "Initial deployment" \
    --compatible-runtimes nodejs12.x \
    --zip-file fileb://banner.zip \
    | python3 -c "import json, sys; print(json.load(sys.stdin)['LayerVersionArn'])")

rm -r nodejs
rm banner.zip

echo $ARN