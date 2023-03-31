import { DataSource } from 'typeorm';

class DatabaseService {
  private static _connection: DataSource;

  public static async initialize(source: DataSource) {
    this._connection = await source.initialize();

    return this._connection;
  }

  public static get connection(): DataSource {
    return DatabaseService._connection;
  }
}

export default DatabaseService;
