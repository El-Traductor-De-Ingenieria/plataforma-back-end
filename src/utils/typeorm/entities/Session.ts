import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryColumn,
} from 'typeorm';
import { ISession } from 'connect-typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Session implements ISession {
    @Index()
    @Column('bigint')
    @ApiProperty()
    expiredAt: number;

    @PrimaryColumn('varchar', { length: 255 })
    @ApiProperty()
    id = '';

    @Column('text')
    @ApiProperty()
    json = '';

    @DeleteDateColumn()
    @ApiProperty()
    destroyedAt?: Date;
}
