import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@utils/types';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ unique: true, name: 'discord_id' })
    @ApiProperty()
    discordId: string;

    @Column({ unique: true })
    @ApiProperty()
    username: string;

    @Column('simple-array')
    @ApiProperty()
    roles: RoleType[];
}
