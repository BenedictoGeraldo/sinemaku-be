import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWatchlistDto {
  @ApiProperty({ example: '550' })
  @IsString()
  @IsNotEmpty()
  movieId!: string;

  @ApiProperty({ example: 'Fight Club' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'https://image.tmdb.org/t/p/w500/example.jpg' })
  @IsString()
  @IsNotEmpty()
  poster!: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  watched?: boolean;
}
