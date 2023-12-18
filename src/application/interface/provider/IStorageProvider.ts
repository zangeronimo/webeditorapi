export interface IStorageProvider {
  saveFile(file: string, company: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
