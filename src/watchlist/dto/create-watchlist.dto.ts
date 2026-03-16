import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWatchlistDto {
  @ApiProperty({ example: 'user-dev-1' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'tt0111161' })
  @IsString()
  @IsNotEmpty()
  movieId!: string;

  @ApiProperty({ example: 'The Shawshank Redemption' })
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
