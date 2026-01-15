import * as z from 'zod';

export const savingGoalSchema = z.object({
    savingGoalAmount: z.coerce.number().int().positive()
})