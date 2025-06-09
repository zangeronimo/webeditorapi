export interface IStorageProvider {
  saveFile(file: string, company: string, prefix?: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
