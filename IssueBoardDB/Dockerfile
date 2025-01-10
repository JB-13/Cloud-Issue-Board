FROM mysql:8.0.24

ENV MYSQL_DATABASE=issue_board
ENV MYSQL_ALLOW_EMPTY_PASSWORD=true

COPY ./conf/* /etc/mysql/conf.d
COPY ./initdb/* /docker-entrypoint-initdb.d/

EXPOSE 3001
