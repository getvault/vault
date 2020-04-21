const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~behaviors': path.resolve(__dirname, 'src/behaviors'),
        '~components': path.resolve(__dirname, 'src/components'),
        '~images': path.resolve(__dirname, 'src/images'),
        '~pages': path.resolve(__dirname, 'src/pages'),
        '~state': path.resolve(__dirname, 'src/state'),
        '~utils': path.resolve(__dirname, 'src/utils'),
      },
      extensions: ['.js', '.jsx', '.json', '.scss', '.svg'],
    },
  })
}
