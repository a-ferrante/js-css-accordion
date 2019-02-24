module.exports = function(api) {

  api.cache(true);

  const presets = [
      [
          '@babel/preset-env',
          {
              targets: 'last 2 versions, ie 11',
              debug: true,
              modules: false,
              useBuiltIns: false,
          }
      ]
  ];
  const env = {
      'test': {
          'presets': [
              [
                  '@babel/preset-env',
                  {
                      useBuiltIns: 'usage',
                      debug: false,
                  },
              ],
          ],
      },
  };

  return {

      presets,
      env,

  };

}
