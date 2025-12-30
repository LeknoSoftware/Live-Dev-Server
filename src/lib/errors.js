class CannotRunServerError extends Error{
    constructor(message){
        super(message);
        this.name = "CannotRunServerError";
    }
}

class NoFileEnteredError extends Error{
    constructor(message){
        super(message);
        this.name = "NoFileEnteredError";
    }
}

class InvalidOptionError extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidOptionError";
    }
}	

export {CannotRunServerError, NoFileEnteredError, InvalidOptionError};
