import { CacheModule } from '@cache/cache.module';
import { DatabaseModule } from '@database/database.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ExpenseModule } from '@modules/expense/expense.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule,
    ExpenseModule,
    CacheModule,
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
        family: Number(process.env.REDIS_FAMILY) || 4,
      },
      readyLog: true,
      closeClient: true,
    }),
  ],
})
export class AppModule {}
