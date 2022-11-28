import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const applicationRouter = router({
  hello: protectedProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  createApplication: protectedProcedure
    .input(z.object({ 
        company: z.string(),
        jobTitle: z.string(),
        applicationDate: z.date(),
    }))
    .mutation(({ ctx, input }) => {
        const newApplication = {
            ...input,
            user: ctx.session.user
        }
        return ctx.prisma.application.create({ data: newApplication });
    }),
  getById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
        return ctx.prisma.application.findFirst({ where: { id: input }})
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.application.findMany({ where: { userId: ctx.session.user.id }});
  }),
});