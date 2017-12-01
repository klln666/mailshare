'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_199206';

  // add your config here
  config.middleware = [];
  config.view = {
      defaultViewEngine: 'nunjucks',
      mapping: {
          '.htm': 'nunjucks',
      },
  };
    config.security = {
        csrf: {
            enable: false,
            // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
            useSession: false,
            headerName: 'x-csrf-token',
            // 通过 query 传递 CSRF token 的默认字段为 _csrf
            queryName: 'FANG_CSRF',
            // 通过 body 传递 CSRF token 的默认字段为 _csrf
            sessionName: 'FANG_CSRF',
            // 通过 body 传递 CSRF token 的默认字段为 _csrf
            bodyName: 'FANG_CSRF'
        }
    };

  return config;
};
