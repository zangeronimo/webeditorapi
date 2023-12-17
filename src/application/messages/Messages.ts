export class Messages {
  static passwordHashFail =
    "Something wrong with the generating password process.";
  static invalidUsernameOrPassword = "Invalid username or password.";
  static invalidJwtToken = "Invalid JWT token.";
  static invalidGrantType = "Invalid grant_type.";
  static notFound = (field: string) => `${field} not found.`;
  static notCreated = (field: string) => `${field} not created.`;
  static alreadyInUse = (field: string) => `${field} already in use.`;
  static accessDenied = "Access denied.";
  static timesheet = {
    EntryOpened: "You already have another task opened.",
    EntryRegisteredThisMinute: "You already have registered at this minute.",
  };
}
