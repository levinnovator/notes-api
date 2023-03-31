import { NoteEntity } from '@entities';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  logger: 'simple-console',
  logging: 'all',
  synchronize: true,
  entities: [NoteEntity],
});

export default AppDataSource;
