import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Almoço' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 99.50 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'Alimentação' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '2025-05-29T12:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  date: string;
}
