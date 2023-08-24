"use client"

import * as z from "zod"

export const formSchema = z.object({
  email: z.string().min(1),
  username: z.string().min(1),
})