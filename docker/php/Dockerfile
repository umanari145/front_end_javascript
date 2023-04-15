FROM php:8.0-apache

RUN echo 'date.timezone = "Asia/Tokyo"' > /usr/local/etc/php/conf.d/timezone.ini
RUN a2enmod rewrite

RUN apt-get update && \
    apt-get install -y libmcrypt-dev libonig-dev openssl git zip unzip

RUN docker-php-ext-install pdo_mysql mysqli

RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer

COPY --from=node:14.2 /usr/local/bin /usr/local/bin
COPY --from=node:14.2 /usr/local/lib /usr/local/lib

RUN npm install -g @vue/cli

WORKDIR /var/www/html

EXPOSE 80
