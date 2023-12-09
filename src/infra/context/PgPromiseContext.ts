import pgPromise from "pg-promise";
import { DbContext } from "./DbContext";

export class PgPromiseContext implements DbContext {
  connection: any;
  transactions: { statement: string; data: any }[];

  constructor() {
    this.connection = pgPromise()(
      "postgres://postgres:virtual@localhost:5432/webeditor"
    );
    this.transactions = [];
  }

  queryAsync(statement: string, data: any, transaction = false): Promise<any> {
    if (!transaction) return this.connection.query(statement, data);

    this.transactions?.push({ statement, data });
    return Promise.resolve();
  }

  async commitAsync() {
    await this.connection
      .tx(async (t: any) => {
        const transactions = [];
        for (const transaction of this.transactions) {
          transactions.push(
            await t.query(transaction.statement, transaction.data)
          );
        }
        return t.batch(transactions);
      })
      .then((data: any) => {
        console.log("commit");
      })
      .catch((error: any) => {
        console.log("error");
      });
  }

  async closeAsync(): Promise<void> {
    await this.connection.$pool.end();
  }
}
