import { router } from "../trpc";
import { applicationRouter } from "./application";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
