import z from 'zod';
import { TypeOf } from 'zod/lib';

export const UserInput = z.object({
    username: z.string(),
    password: z.string(),
    photo: z.string(),
})

export type CreateUserInput = z.TypeOf<typeof UserInput>;