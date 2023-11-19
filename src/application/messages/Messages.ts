export class Messages {
  static InvalidUsernameOrPassword = "Invalid username or password.";
  static InvalidJwtToken = "Invalid JWT token.";
  static NotFound = (field: string) => `${field} not found.`;
  static AlreadyInUse = (field: string) => `${field} already in use.`;
}
