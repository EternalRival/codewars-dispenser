import { z } from 'zod';
import userSchema from './user.schema';

const usersStateSchema = 
 z.array(userSchema)

export type UsersState = z.infer<typeof usersStateSchema>;

export default usersStateSchema;
