import { ApiProperty } from '@nestjs/swagger';

export class Expense {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
