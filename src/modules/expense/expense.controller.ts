import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@auth/auth.guard';
import { ExpenseService } from '@modules/expense/expense.service';
import { Expense } from '@modules/expense/entities/expense.entity';
import { CreateExpenseDto } from '@modules/expense/dto/create-expense.dto';
import { UpdateExpenseDto } from '@modules/expense/dto/update-expense.dto';

@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({ status: 201, type: Expense })
  async create(@Body() dto: CreateExpenseDto) {
    const expense = await this.expenseService.create(dto);
    
    return expense;
  }

  @Get()
  @ApiOperation({
    summary: 'List expenses, with filtering by month, year, and category',
  })
  @ApiQuery({ name: 'month', required: false, type: String, example: '05' })
  @ApiQuery({ name: 'year', required: false, type: String, example: '2025' })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    example: 'Food',
  })
  @ApiResponse({ status: 200, type: [Expense] })
  async findAll(
    @Query('month') month?: string,
    @Query('year') year?: string,
    @Query('category') category?: string,
  ) {
    const data = await this.expenseService.findAll({ month, year, category });

    return data;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  @ApiResponse({ status: 200, type: Expense })
  async findOne(@Param('id') id: string) {
    const expense = await this.expenseService.findOne(id);

    return expense;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing expense' })
  @ApiResponse({ status: 200, type: Expense })
  async update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    const expense = await this.expenseService.update(id, dto);

    return expense;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an expense' })
  @ApiResponse({
    status: 200,
    schema: { example: { message: 'Expense deleted successfully' } },
  })
  async remove(@Param('id') id: string) {
    const result = await this.expenseService.remove(id);

    return result;
  }
}
