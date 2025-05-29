import { CacheModule } from '@cache/cache.module';
import { DatabaseModule } from '@database/database.module';
import { ExpenseController } from '@modules/expense/expense.controller';
import { ExpenseService } from '@modules/expense/expense.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
