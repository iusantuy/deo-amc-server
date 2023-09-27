
class GlobalError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode < 500 ? 'error' : 'fail';
        Error.captureStackTrace(this, this.contructor);
    }
}

module.exports = GlobalError