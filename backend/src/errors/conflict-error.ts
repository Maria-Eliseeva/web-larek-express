class ConflictError extends Error {
    public statusCode: number = 409;
    constructor(message: string) {
        super(message);
    }
}
export default ConflictError;