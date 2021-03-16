/**
 * The messages and error codes of out application
 */
export class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {}
}
