const MOTOR = 'mysql';
// const MOTOR = 'postgres';

module.exports =
    MOTOR === 'mysql'
        ? require('./mysql')
        : require('./postgres');