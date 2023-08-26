"use client"

import * as z from "zod"

export const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
})