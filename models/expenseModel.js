import * as z from 'zod';

export const expenseDataSchema = z.object({
    expenseAmount: z.coerce.number().int().gte(0),
    expenseDescription: z.string().trim(),
    expenseCategoryId: z.string().trim()
});

export const expenseCategorySchema = z.object({
    expenseCategory: z.string().trim(),
    isFixed: z.coerce.boolean()
})