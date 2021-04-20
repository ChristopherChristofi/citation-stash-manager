import { ApiProperty } from "@nestjs/swagger";

export class CreateCitationDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    link: string;

    @ApiProperty()
    project: string;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    createAt: Date;

    @ApiProperty()
    updateAt: Date;
}