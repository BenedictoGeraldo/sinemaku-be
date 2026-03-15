import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchlistModule } from './watchlist/watchlist.module';

@Module({
  imports: [WatchlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
