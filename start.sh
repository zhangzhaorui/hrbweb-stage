#!/bin/bash

sed -i 's/#API_PORT#/'$API_PORT'/g' /etc/nginx/nginx.conf
sed -i 's/#API_SERVER#/'$API_SERVER'/g' /etc/nginx/nginx.conf
#sed -i 's/#NPM_PORT#/'$NPM_PORT'/g' /etc/nginx/nginx.conf

nginx -g "daemon on;"
#npm start
node ./bin/www
