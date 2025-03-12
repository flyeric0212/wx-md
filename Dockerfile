#FROM nginx:latest
FROM registry.cn-chengdu.aliyuncs.com/flyeric/nginx:latest

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD /bin/bash -c "exec nginx -g 'daemon off;'"
