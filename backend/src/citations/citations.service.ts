import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitationDto } from './dto/create-citation.dto';
import { UpdateCitationDto } from './dto/update-citation.dto';
import { Citation } from './entities/new-citation.entity';

@Injectable()
export class CitationsService {
  constructor(@InjectRepository(Citation) private citationRepository: Repository<Citation>,
  ) {}

  async findAll(title?: string): Promise<Citation[]> {
    if (title) {
      const citation = await this.citationRepository
        .find({
          where: { title: title }
        });
      return citation;
    }
    return this.citationRepository.find();
  }

  async findByCode(code: number): Promise<Citation> {
    try {
      const citation = await this.citationRepository.findOneOrFail(code);
      return citation;
    } catch (err) {
      throw err;
    }
  }

  addCitation(createCitationDto: CreateCitationDto): Promise<Citation> {
    const newCite = this.citationRepository.create({ ...createCitationDto });
    return this.citationRepository.save(newCite);
  }

  async updateNotes(code: number, notes: string): Promise<Citation> {
    const citation = await this.findByCode(code);

    citation.notes = notes;

    return this.citationRepository.save(citation);
  }

  async deleteCitation(code: number): Promise<Citation> {
    const citation = await this.findByCode(code);

    return this.citationRepository.remove(citation);
  }
}
