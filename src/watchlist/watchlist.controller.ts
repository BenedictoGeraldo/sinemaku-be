import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { WatchlistService } from './watchlist.service';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { QueryWatchlistDto } from './dto/query-watchlist.dto';

@ApiTags('Watchlist')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiOperation({ summary: 'Tambah movie ke watchlist' })
  @Post()
  create(@Body() dto: CreateWatchlistDto) {
    return this.watchlistService.create(dto);
  }

  @ApiOperation({ summary: 'Ambil semua watchlist user' })
  @ApiQuery({ name: 'userId', required: true, type: String })
  @Get()
  findAll(@Query() query: QueryWatchlistDto) {
    return this.watchlistService.findAllByUser(query.userId);
  }

  @ApiOperation({ summary: 'Ambil detail item watchlist' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistService.findOne(id);
  }

  @ApiOperation({ summary: 'Update item watchlist' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWatchlistDto) {
    return this.watchlistService.update(id, dto);
  }

  @ApiOperation({ summary: 'Hapus item watchlist' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchlistService.remove(id);
  }
}
