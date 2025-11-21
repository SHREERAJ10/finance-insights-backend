import * as z from 'zod';

const incomeDataSchema = z.object({
    incomeAmount: z.number().int().positive(),
    incomeSourceId: z.string().trim()
});

export default incomeDataSchema;