import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { WatchlistService } from './watchlist.service';

type JwtUser = {
  userId: string;
  email: string;
};

type AuthenticatedRequest = Request & {
  user: JwtUser;
};

@ApiTags('Watchlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiOperation({ summary: 'Tambah movie ke watchlist' })
  @Post()
  create(@Body() dto: CreateWatchlistDto, @Req() req: AuthenticatedRequest) {
    return this.watchlistService.create(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Ambil semua watchlist user login' })
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.watchlistService.findAllByUser(req.user.userId);
  }

  @ApiOperation({ summary: 'Ambil detail item watchlist' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.watchlistService.findOne(id, req.user.userId);
  }

  @ApiOperation({ summary: 'Update item watchlist' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWatchlistDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.watchlistService.update(id, req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Hapus item watchlist' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.watchlistService.remove(id, req.user.userId);
  }
}
