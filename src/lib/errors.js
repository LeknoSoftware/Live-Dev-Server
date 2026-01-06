class CannotRunServerError extends Error{
    constructor(message){
        super(message);
        this.name = "CannotRunServerError";
    }
}

class CannotFindFileError extends Error{
    constructor(message){
        super(message);
        this.name = "CannotFindFileError";
    }
}

class InvalidOptionError extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidOptionError";
    }
}

export {CannotRunServerError, CannotFindFileError, InvalidOptionError};
