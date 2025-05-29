import { RedisCacheService } from '@cache/redis-cache.service';
import { PrismaService } from '@database/prisma.service';
import { CreateExpenseDto } from '@modules/expense/dto/create-expense.dto';
import { UpdateExpenseDto } from '@modules/expense/dto/update-expense.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ExpenseService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: RedisCacheService,
  ) {}

  async create(dto: CreateExpenseDto) {
    const expenseDate = dto.date ? new Date(dto.date) : new Date();

    const expense = await this.prisma.expense.create({
      data: {
        ...dto,
        date: expenseDate,
      },
    });

    await this.cache.delPattern('expenses:*');

    return expense;
  }

  async findAll(query: { month?: string; year?: string; category?: string }) {
    const { month, year, category } = query;

    const cacheKey = `expenses:${month || ''}:${year || ''}:${category || ''}`;
    const cached = await this.cache.get(cacheKey);

    if (cached) return cached;

    let where: {
      date:
        | undefined
        | {
            gte: Date;
            lt: Date;
          };
      category?: string;
    } = {
      date: undefined,
      category: undefined,
    };

    if (month && year) {
      const start = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      where.date = {
        gte: start,
        lt: end,
      };
    }

    if (category) {
      where.category = category;
    }

    const expenses = await this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    await this.cache.set(cacheKey, expenses, 60); // Cache for 60 seconds

    return expenses;
  }

  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });

    if (!expense) throw new NotFoundException('Expense not found');

    return expense;
  }

  async update(id: string, dto: UpdateExpenseDto) {
    await this.findOne(id);

    const expense = await this.prisma.expense.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
    });

    await this.cache.delPattern('expenses:*');

    return expense;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.expense.delete({ where: { id } });

    await this.cache.delPattern('expenses:*');

    return { message: 'Expense deleted successfully' };
  }
}
