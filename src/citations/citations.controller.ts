import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CitationsService } from './citations.service';
import { CreateCitationDto } from './dto/create-citation.dto';
import { UpdateCitationDto } from './dto/update-citation.dto';
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
/*
  @ApiOkResponse({type: Citation}) // description: 'the citation'
  @ApiNotFoundResponse()
  @Get(':code')
  getCitationByCode(@Param('code', ParseIntPipe) code: number): Citation {

    const citation = this.citationsService.findByCode(code);

    if (!citation) {
      throw new NotFoundException();
    }

    return citation;
  }
*/
  @ApiCreatedResponse({type: Citation})
  @ApiBadRequestResponse()
  @Post()
  addCitation(@Body() body: CreateCitationDto): Promise<Citation> {
    return this.citationsService.addCitation(body);
  }

  @Put()
  updateNotes(@Body() body: UpdateCitationDto): Promise<Citation> {
    const citation = this.citationsService.updateNotes(body);

    if (!citation) {
      throw new InternalServerErrorException();
    }

    return citation;
  }
}
