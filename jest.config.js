module.exports = {
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
    testMatch: ['<rootDir>/packages/**/__tests__/**/*test.js'],
    coverageDirectory: 'dist/test-coverage',
    coverageReporters: ['html', 'text'],
    collectCoverageFrom: [
        '<rootDir>/packages/**/main/**/*.js',
    ],
    rootDir: __dirname
};