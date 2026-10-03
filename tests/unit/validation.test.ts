import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registerSchema,
  documentUploadSchema,
} from "@/lib/validation/auth";

describe("Validasi Autentikasi (loginSchema & registerSchema)", () => {
  it("harus meloloskan data login yang valid", () => {
    const validData = {
      email: "peternak@tanyaternak.id",
      password: "password123",
      rememberMe: true,
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("harus menolak format email yang tidak valid pada login", () => {
    const invalidData = {
      email: "bukan-email",
      password: "password123",
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Format email tidak valid");
    }
  });

  it("harus menolak kata sandi login yang terlalu pendek (<6 karakter)", () => {
    const invalidData = {
      email: "admin@tanyaternak.id",
      password: "123",
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("harus meloloskan data pendaftaran pengguna yang lengkap dan valid", () => {
    const validRegister = {
      full_name: "Budi Santoso",
      email: "budi@farm.id",
      phone: "081234567890",
      password: "rahasia12345",
      confirmPassword: "rahasia12345",
    };
    const result = registerSchema.safeParse(validRegister);
    expect(result.success).toBe(true);
  });

  it("harus menolak jika konfirmasi kata sandi tidak cocok", () => {
    const invalidRegister = {
      full_name: "Budi Santoso",
      email: "budi@farm.id",
      phone: "081234567890",
      password: "rahasia12345",
      confirmPassword: "passwordBeda",
    };
    const result = registerSchema.safeParse(invalidRegister);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Konfirmasi kata sandi tidak cocok");
    }
  });
});

describe("Validasi Dokumen Riset (documentUploadSchema)", () => {
  it("harus meloloskan dokumen yang memiliki judul dan kategori valid", () => {
    const validDoc = {
      title: "Pedoman Nutrisi Pakan Ayam Broiler 2026",
      category: "Nutrisi & Pakan",
      publication_year: 2026,
    };
    const result = documentUploadSchema.safeParse(validDoc);
    expect(result.success).toBe(true);
  });

  it("harus menolak dokumen jika judul kurang dari 3 karakter", () => {
    const invalidDoc = {
      title: "ab",
      category: "Umum",
    };
    const result = documentUploadSchema.safeParse(invalidDoc);
    expect(result.success).toBe(false);
  });

  it("harus menolak tahun publikasi yang di luar batas wajar (<1990 atau >2030)", () => {
    const invalidDoc = {
      title: "Riset Unggas Kuno",
      category: "Sejarah",
      publication_year: 1980,
    };
    const result = documentUploadSchema.safeParse(invalidDoc);
    expect(result.success).toBe(false);
  });
});
