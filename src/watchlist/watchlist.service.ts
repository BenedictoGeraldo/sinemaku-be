import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateWatchlistDto) {
    const existing = await this.prisma.watchlist.findFirst({
      where: {
        userId,
        movieId: dto.movieId,
      },
    });

    if (existing) {
      throw new ConflictException('Film sudah berada di watchlist');
    }

    return this.prisma.watchlist.create({
      data: {
        userId,
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

  async findOne(id: string, userId: string) {
    const item = await this.prisma.watchlist.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Watchlist item tidak ditemukan');
    }

    if (item.userId !== userId) {
      throw new ForbiddenException('Tidak memiliki akses ke item ini');
    }

    return item;
  }

  async update(id: string, userId: string, dto: UpdateWatchlistDto) {
    await this.findOne(id, userId);

    return this.prisma.watchlist.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.watchlist.delete({
      where: { id },
    });
  }
}
