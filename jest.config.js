module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      useESM: true
    }],
  },

  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'html', 'mjs'],

  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|rxjs|@angular|primeng|sweetalert2)',
  ],

  moduleNameMapper: {
    '^@angular/(.*)$': '<rootDir>/src/test/angular-mock.ts',
    '^primeng/(.*)$': '<rootDir>/src/test/primeng-mock.ts'
  },

  setupFilesAfterEnv: ['<rootDir>/src/test/setup-jest.ts'],

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      useESM: true
    },
  },
};
