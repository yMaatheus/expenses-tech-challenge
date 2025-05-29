import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { ExpenseModule } from '@modules/expense/expense.module';

@Module({
  imports: [DatabaseModule, ExpenseModule],
})
export class AppModule {}
