FROM registry.dataos.io/nodejs/baseimage-web-nodejs:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh /start.sh

#ENV TIME_ZONE=Asia/Shanghai
#RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone
RUN npm install -g gulp
RUN npm install -g webpack

##VOLUME /datahub/src/main/webapp/
#ADD ./webapp /datahub/src/main/webapp
RUN mkdir -p /datahub/raw/main/webapp
ADD . /datahub/raw/main/webapp
#WORKDIR /datahub/raw/main/webapp

RUN cd /datahub/raw/main/webapp && gulp build
WORKDIR /datahub/raw/main/webapp/dist

EXPOSE  80 443

#RUN mkdir -p /etc/nginx/sslkey

CMD ["/start.sh"]
#ENTRYPOINT ["/start.sh"]
