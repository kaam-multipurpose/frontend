export class ApiError extends Error {
  public statusCode: number;
  public responseBody: any;

  constructor(message: string, statusCode?: number, responseBody?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode ?? 500;
    this.responseBody = responseBody;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
