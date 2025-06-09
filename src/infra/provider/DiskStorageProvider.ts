import fs from "fs";
import path from "path";
import { IStorageProvider } from "@application/interface/provider/IStorageProvider";

export class DiskStorageProvider implements IStorageProvider {
  async saveFile(
    file: string,
    company: string,
    prefix?: string
  ): Promise<string> {
    if (!file) return "";
    const [header, base64Data] = file.split(",");
    const [, type] = header.replace(";base64", "").split("/");
    const name = `${new Date().getTime()}.${type}`;
    const folder = prefix ? `${company}/${prefix}` : company;
    const dir = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "upload",
      ...(folder.split("/") ?? [])
    );
    this.createDir(dir);
    fs.writeFile(`${dir}/${name}`, base64Data, "base64", (err) =>
      console.log(err)
    );
    return `/files/${folder}/${name}`;
  }

  async deleteFile(file: string): Promise<void> {
    if (!file) return;
    try {
      const removeFile = file.replace("/files/", "upload/");
      const filePath = path.resolve(__dirname, "..", "..", "..", removeFile);
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
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
