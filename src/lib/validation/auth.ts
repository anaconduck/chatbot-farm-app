import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Nama lengkap minimal 2 karakter"),
    email: z.string().email("Format email tidak valid"),
    phone: z.string().min(8, "Nomor telepon/WhatsApp minimal 8 digit"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi kata sandi minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const documentUploadSchema = z.object({
  title: z.string().min(3, "Judul dokumen riset wajib diisi"),
  category: z.string().min(1, "Kategori riset wajib dipilih"),
  author: z.string().optional(),
  publication_year: z.coerce.number().min(1990).max(2030).optional(),
  description: z.string().optional(),
  access_status: z.enum(["Publik", "Internal"]).default("Publik"),
});

export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;
