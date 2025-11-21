import * as z from 'zod';

const incomeDataSchema = z.object({
    incomeAmount: z.number().int().positive(),
    incomeSourceId: z.string().trim()
});

export const incomeSourceSchema = z.object({
    incomeSource: z.string().trim(),
    isFixed: z.boolean()
});

export default incomeDataSchema;