import pgPromise from "pg-promise";
import { DbContext } from "./DbContext";

export class PgPromiseContext implements DbContext {
  connection: any;

  constructor() {
    this.connection = pgPromise()(
      "postgres://postgres:virtual@localhost:5432/webeditor"
    );
  }

  query(
    statement: string,
    data: any,
    transactional: boolean = false
  ): Promise<any> {
    return this.connection.query(statement, data);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
