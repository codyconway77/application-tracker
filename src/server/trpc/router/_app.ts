import { router } from "../trpc";
import { applicationRouter } from "./application";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
