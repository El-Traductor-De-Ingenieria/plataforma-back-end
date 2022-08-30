import { DbFileType } from '../../../utils/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class DbFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DbFileType, default: DbFileType.TEXT })
  type: DbFileType;

  @Column()
  uploaderId: number;

  @CreateDateColumn()
  uploadDate: Date;

  @Column({ type: 'varchar', length: '1024', nullable: true })
  textOrUrl?: string;

  @Column({ type: 'varchar', length: '128', nullable: true, unique: true })
  filePath?: string;

  @Column({ type: 'varchar', length: '256', nullable: true })
  fileName?: string;

  @Column({ type: 'varchar', length: '64', unique: true, nullable: true })
  fileHash?: string;

  @Column({ type: 'bool', default: false })
  approved: boolean;
}
