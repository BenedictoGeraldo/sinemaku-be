import { IsNotEmpty, IsString } from 'class-validator';

export class QueryWatchlistDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
