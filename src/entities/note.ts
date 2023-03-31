import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import BaseEntity from './base';

@Entity({ name: 'notes' })
class NoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: '', nullable: false, type: 'varchar' })
  public title: string;

  @Column({ default: '', nullable: false, type: 'varchar' })
  public message: string;
}

export default NoteEntity;
