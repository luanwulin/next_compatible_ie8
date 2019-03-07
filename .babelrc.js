module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'useBuiltIns': 'entry',
      'targets': {
        'browsers': [
          'ie >= 8'
        ]
      },
      'modules': 'commonjs',
      'loose': true
    }],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  'plugins': [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime', {
      'corejs': 2
    }],
    'transform-es3-property-literals',
    'transform-es3-member-expression-literals',
    ['babel-plugin-transform-define', {
      'process.env.NEXT_VERSION': require('./package.json').version
    }]
  ]
}
