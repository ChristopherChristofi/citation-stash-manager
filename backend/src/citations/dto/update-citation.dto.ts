import { ApiProperty } from "@nestjs/swagger";

export class UpdateCitationDto {
    @ApiProperty()
    code: number;

    @ApiProperty()
    notes: string;
}