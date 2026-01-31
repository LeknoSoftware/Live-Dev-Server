export class CannotRunServerError extends Error{
    constructor(message){
        super(message);
        this.name = "CannotRunServerError";
    }
}

export class CannotFindFileError extends Error{
    constructor(message){
        super(message);
        this.name = "CannotFindFileError";
    }
}

export class InvalidOptionError extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidOptionError";
    }
}

export class WebSocketConnectionError extends Error{
    constructor(message){
        super(message);
        this.name = "WebSocketConnectionError";
    }
}
