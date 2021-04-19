import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Citation {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    code: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    author: string;

    @ApiProperty()
    @Column()
    link: string;

    @ApiProperty()
    @Column()
    project: string;

    @ApiProperty()
    @Column()
    notes: string;

    @ApiProperty()
    @CreateDateColumn()
    createAt: Date

    @ApiProperty()
    @UpdateDateColumn()
    updateAt: Date
}