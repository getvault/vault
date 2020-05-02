module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/config/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '~(.*)$': '<rootDir>/src/$1',
    '__test__/(.*)$': '<rootDir>/__test__/$1',
    '(.*).style$': '<rootDir>/__mocks__/file-mock.js',
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  moduleFileExtensions: ['js', 'jsx', 'scss'],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFilesAfterEnv: ['<rootDir>/config/setup.js'],
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/config/loadershim.js`],
}
