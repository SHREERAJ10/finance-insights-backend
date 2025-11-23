import * as z from 'zod';

export const expenseDataSchema = z.object({
    expenseAmount: z.number().int().positive(),
    expenseDescription: z.string().trim(),
    expenseCategoryId: z.string().trim()
});