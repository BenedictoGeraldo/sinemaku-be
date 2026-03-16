import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWatchlistDto) {
    const existing = await this.prisma.watchlist.findFirst({
      where: {
        userId: dto.userId,
        movieId: dto.movieId,
      },
    });

    if (existing) {
      throw new ConflictException('Film sudah berada di watchlist');
    }

    return this.prisma.watchlist.create({
      data: {
        userId: dto.userId,
        movieId: dto.movieId,
        title: dto.title,
        poster: dto.poster,
        watched: dto.watched ?? false,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.watchlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.watchlist.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Watchlist item tidak ditemukan');
    }

    return item;
  }

  async update(id: string, dto: UpdateWatchlistDto) {
    await this.findOne(id);

    return this.prisma.watchlist.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.watchlist.delete({
      where: { id },
    });
  }
}
