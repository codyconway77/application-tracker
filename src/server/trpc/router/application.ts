import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const applicationRouter = router({
  createApplication: protectedProcedure
    .input(z.object({ 
        company: z.string(),
        jobTitle: z.string(),
        applicationDate: z.date(),
    }))
    .mutation(({ ctx, input }) => {
        const newApplication = {
            ...input,
            userId: ctx.session.user.id
        }
        return ctx.prisma.application.create({ data: newApplication });
    }),
  updateById: protectedProcedure
    .input(z.object({
        id: z.string(),
        status: z.string(),
    }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.application.update({
            where: { id: input.id },
            data: { status: input.status }
        })
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