export class User {}
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { EntityHelper } from '../../utils/entity-helper';
import { Exclude, Expose } from 'class-transformer';
import { UserType } from './users.enums';

@Entity()
export class Users extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'firstName' })
  firstName: string;

  @Index()
  @Column({ name: 'lastName' })
  lastName: string;

  @Column({
    name: 'email',
  })
  @Expose()
  email: string | null;

  @Column({ name: 'password' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ name: 'createdAt', type: 'bigint' })
  createdAt: number;

  @Column({ name: 'updatedAt', type: 'bigint' })
  updatedAt: number;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.STAFF,
    name: 'userType',
  })
  userType: UserType;

  @Column({ name: 'isDeleted', default: false })
  isDeleted: boolean;

  @Column({ type: 'bigint', nullable: true })
  deletedAt?: number;
}
