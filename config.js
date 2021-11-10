const environments = {};

environments.dev = {
    httpPort: 3000,
    envName: 'dev',
    hashingSecret: 'dummy-secret',
    defaultLang: 'en',
    db: {
        host: 'localhost',
        user: 'root',
        database: 'todo',
    },
};

environments.production = {
    httpPort: 5000,
    envName: 'production',
    hashingSecret: 'super-secret-salt-for-production-please-change-it-before-using-it-thanks',
    defaultLang: 'lt',
    db: {
        host: 'localhost',
        user: 'root',
        database: 'todo-d2f54',
    },
};

const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
const exportableEnvName = typeof environments[currentEnv] === 'object' ? currentEnv : 'dev';

module.exports = environments[exportableEnvName];