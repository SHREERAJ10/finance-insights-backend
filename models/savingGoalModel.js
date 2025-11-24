import * as z from 'zod';

export const savingGoalSchema = z.object({
    savingGoalAmount: z.number().int().positive()
})