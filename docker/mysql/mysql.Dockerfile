FROM mysql:8.4.6 AS mysql

RUN chmod 1770 /var/run/mysqld

EXPOSE 3306
