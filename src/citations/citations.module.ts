import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitationsController } from './citations.controller';
import { CitationsService } from './citations.service';
import { Citation } from './entities/new-citation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Citation])],
  controllers: [CitationsController],
  providers: [CitationsService]
})
export class CitationsModule {}
