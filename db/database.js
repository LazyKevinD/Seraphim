//const MOTOR = 'mysql';
// const MOTOR = 'postgres';
const MOTOR = 'linea';

module.exports =
    MOTOR === 'mysql'
        ? require('./mysql')
        : MOTOR === 'postgres'
            ? require('./postgres')
            : require('./linea');