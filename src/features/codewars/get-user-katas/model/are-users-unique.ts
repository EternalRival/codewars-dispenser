import type { User } from '~/entities/user';

export function areUsersUnique(users: User[]): boolean {
  const unique = new Set();

  for (const { cw } of users) {
    if (unique.has(cw)) {
      return false;
    }

    unique.add(cw);
  }

  return true;
}
