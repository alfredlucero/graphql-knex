import { UserRepository } from "./repositories/UserRepository";

export interface Context {
  scopes: string[];
  repositories: {
    user: typeof UserRepository;
  };
}

export const context = (req: any): Context => {
  return {
    scopes: req.scopes ?? [],
    repositories: {
      user: UserRepository,
    },
  };
};
