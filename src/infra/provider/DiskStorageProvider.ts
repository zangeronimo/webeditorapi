import fs from "fs";
import path from "path";
import { IStorageProvider } from "@application/interface/provider/IStorageProvider";

export class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string, company: string): Promise<string> {
    if (!file) return "";
    const [header, base64Data] = file.split(",");
    const [, type] = header.replace(";base64", "").split("/");
    const name = `${new Date().getTime()}.${type}`;
    const dir = path.resolve("upload", company);
    this.createDir(dir);
    fs.writeFile(`${dir}/${name}`, base64Data, "base64", (err) =>
      console.log(err)
    );
    return `/files/${company}/${name}`;
  }

  async deleteFile(file: string): Promise<void> {
    if (!file) return;
    try {
      const removeFile = file.replace("/files/", "upload/");
      const dir = path.resolve(removeFile);
      await fs.promises.stat(dir);
      await fs.promises.unlink(dir);
    } catch {
      return;
    }
  }

  private createDir(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}
