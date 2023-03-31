import {
  CreateDateColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn,
} from 'typeorm';

class BaseEntity extends TypeormBaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default BaseEntity;
