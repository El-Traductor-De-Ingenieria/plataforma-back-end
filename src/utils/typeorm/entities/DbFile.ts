import { DbFileType } from '../../../utils/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'files' })
export class DbFile {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'enum', enum: DbFileType, default: DbFileType.TEXT })
  @ApiProperty()
  type: DbFileType;

  @Column()
  @ApiProperty()
  uploaderId: number;

  @CreateDateColumn()
  @ApiProperty()
  uploadDate: Date;

  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: '1024', nullable: true })
  @ApiProperty()
  textOrUrl?: string;

  @Column({ type: 'varchar', length: '128', nullable: true, unique: true })
  @ApiProperty()
  filePath?: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: '256' })
  @ApiProperty()
  fileName: string;

  @Column({ type: 'varchar', length: '64', unique: true })
  @ApiProperty()
  fileHash: string;

  @Column({ type: 'bool', default: false })
  @ApiProperty()
  approved: boolean;

  @Column({ type: 'numeric', default: 0 })
  reputationPoints: number;
}
