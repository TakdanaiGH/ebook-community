module.exports = function(api) {
  const validEnv = ['development', 'test', 'production'];
  const currentEnv = api.env();
  const isDevelopmentEnv = api.env('development');
  const isProductionEnv = api.env('production');
  const isTestEnv = api.env('test');

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    );
  }

  return {
    presets: [
      // Test environment preset
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          },
          modules: 'commonjs'
        },
        '@babel/preset-react'
      ],
      // Production or Development preset
      (isProductionEnv || isDevelopmentEnv) && [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          exclude: ['transform-typeof-symbol']
        }
      ],
      [
        '@babel/preset-react',
        {
          development: isDevelopmentEnv || isTestEnv,
          useBuiltIns: true
        }
      ]
    ].filter(Boolean),

    plugins: [
      // Common plugins
      'babel-plugin-macros',
      '@babel/plugin-syntax-dynamic-import',
      isTestEnv && 'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      
      // Private properties and methods plugins
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: true
        }
      ],
      [
        '@babel/plugin-proposal-private-methods',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-private-property-in-object',
        {
          loose: true
        }
      ],

      // Runtime helpers for async/await
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true,
          corejs: false
        }
      ],
      
      // Regenerator plugin for async functions
      [
        '@babel/plugin-transform-regenerator',
        {
          async: false
        }
      ],

      // Remove PropTypes in production
      isProductionEnv && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true
        }
      ]
    ].filter(Boolean)
  };
};
