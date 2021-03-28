# local-crontab-web-converter
Convert localized crontab to UTC crontabs via simple web page. This project is based on [UnitedIncome/local-crontab](https://github.com/UnitedIncome/local-crontab).

[![](./local-crontab-web.png)](https://sonic0.github.io/local-crontab-web-converter)

This project is a simple front-end for [local-crontab backend](https://github.com/Sonic0/local-crontab-serverless-infrastructure), based on AWS.

## Use of backend Rest-API
API endpoint and api-key are into the _config.json_ file. They are in clear-text . API calls are limited to 100/day 1/sec, so please do not abuse it.

## Project info
This repo is part of my projects group, called _Cron-Converter_.
Its related repositories:

- [cron-converter](https://github.com/Sonic0/cron-converter)
- [local-crontab](https://github.com/Sonic0/local-crontab)
- [local-crontab-ansible-filter](https://github.com/Sonic0/local-crontab-ansible-filter)
- [local-crontab-serverless-infrastructure](https://github.com/Sonic0/local-crontab-serverless-infrastructure)
