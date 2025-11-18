import * as z from 'zod';

export const usernameSchema = z.object({
    username: z.string().min(3).max(20).trim()
});