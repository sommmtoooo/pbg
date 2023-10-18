export default class CustomException extends Error {
  public static errorName = "CustomException" as const;
  constructor(message: string) {
    super(message);
    this.name = CustomException.errorName;
    this.message = message;
  }
}
