import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CitationsService } from './citations.service';
import { CreateCitationDto } from './dto/create-citation.dto';
import { Citation } from './entities/new-citation.entity';

@ApiTags('citations')
@Controller('citations')
export class CitationsController {
  constructor(private citationsService: CitationsService) {}

  @ApiOkResponse({type: Citation, isArray: true})
  @ApiQuery({name: 'title', required: false})
  @Get()
  getCitations(@Query('title') title: string): Promise<Citation[]> {
    return this.citationsService.findAll(title);
  }

  @ApiOkResponse({type: Citation}) // description: 'the citation'
  @ApiInternalServerErrorResponse()
  @Get(':code')
  getCitationByCode(@Param('code', ParseIntPipe) code: number): Promise<Citation> {

    const citation = this.citationsService.findByCode(code);

    if (!citation) {
      throw new InternalServerErrorException();
    }

    return citation;
  }

  @ApiCreatedResponse({type: Citation})
  @ApiBadRequestResponse()
  @Post()
  addCitation(@Body() body: CreateCitationDto): Promise<Citation> {
    return this.citationsService.addCitation(body);
  }

  @ApiOkResponse({type: Citation})
  @ApiInternalServerErrorResponse()
  @Put(':code/update')
  async updateNotes(@Param('code', ParseIntPipe) code: number, @Body() body: CreateCitationDto): Promise<Citation> {

    const citation = await this.citationsService.findByCode(code);

    if (!citation) {
      throw new InternalServerErrorException();
    }

    return await this.citationsService.updateNotes(code, body.notes);
  }

  @ApiOkResponse({type: Citation})
  @ApiInternalServerErrorResponse()
  @Delete(':code/delete')
  async deleteCitation(@Param('code', ParseIntPipe) code: number): Promise<Citation> {

    const citation = await this.citationsService.findByCode(code);

    await this.citationsService.deleteCitation(code);

    if (!citation) {
      throw new InternalServerErrorException();
    }

    return citation;
  }
}
