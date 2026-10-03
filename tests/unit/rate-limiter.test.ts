import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimits } from "@/lib/security/rateLimiter";

describe("Keamanan API: In-Memory Rate Limiter", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it("harus mengizinkan permintaan pertama dalam batas kuota", () => {
    const res = checkRateLimit("192.168.1.1", 5, 10000);
    expect(res.allowed).toBe(true);
    expect(res.remaining).toBe(4);
  });

  it("harus melacak jumlah permintaan berturut-turut untuk IP yang sama", () => {
    const ip = "192.168.1.50";
    checkRateLimit(ip, 3, 10000);
    const second = checkRateLimit(ip, 3, 10000);
    expect(second.allowed).toBe(true);
    expect(second.remaining).toBe(1);

    const third = checkRateLimit(ip, 3, 10000);
    expect(third.allowed).toBe(true);
    expect(third.remaining).toBe(0);

    // Ke-4 harus ditolak (rate limit exceeded)
    const fourth = checkRateLimit(ip, 3, 10000);
    expect(fourth.allowed).toBe(false);
    expect(fourth.remaining).toBe(0);
    expect(fourth.resetInSeconds).toBeGreaterThan(0);
  });

  it("harus memisahkan kuota antar IP yang berbeda", () => {
    const ipA = "10.0.0.1";
    const ipB = "10.0.0.2";

    // Habiskan kuota IP A
    checkRateLimit(ipA, 1, 10000);
    const blockedA = checkRateLimit(ipA, 1, 10000);
    expect(blockedA.allowed).toBe(false);

    // IP B harus tetap diizinkan
    const allowedB = checkRateLimit(ipB, 1, 10000);
    expect(allowedB.allowed).toBe(true);
  });
});
