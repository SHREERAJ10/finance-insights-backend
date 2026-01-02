import * as z from 'zod';

const incomeDataSchema = z.object({
    incomeAmount: z.coerce.number().int().gte(0),
    incomeSourceId: z.string().trim()
});

export const incomeSourceSchema = z.object({
    incomeSource: z.string().trim(),
    isFixed: z.coerce.boolean()
});

export default incomeDataSchema;