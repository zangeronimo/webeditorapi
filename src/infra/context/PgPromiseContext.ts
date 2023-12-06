import pgPromise from "pg-promise";
import { DbContext } from "./DbContext";

export class PgPromiseContext implements DbContext {
  connection: any;

  constructor() {
    this.connection = pgPromise()(
      "postgres://postgres:virtual@localhost:5432/webeditor"
    );
  }

  queryAsync(statement: string, data: any): Promise<any> {
    return this.connection.query(statement, data);
  }

  async closeAsync(): Promise<void> {
    await this.connection.$pool.end();
  }
}
