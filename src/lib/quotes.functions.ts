import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

export const quoteSchema = z
  .object({
    services: z.array(z.string().max(60)).min(1, "En az bir seçim yapın").max(10),
    packageSlug: z.string().max(60).optional(),
    sector: z.string().trim().min(1, "Sektör girin").max(100),
    description: z.string().trim().min(10, "En az 10 karakter yazın").max(2000),
    startTime: z.string().trim().max(100).optional(),
    name: z.string().trim().min(2, "Adınızı girin").max(100),
    business: z.string().trim().max(150).optional(),
    email: z.string().trim().email("Geçerli bir e-posta girin").max(255).optional().or(z.literal("")),
    phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/, "Geçerli bir telefon girin").optional().or(z.literal("")),
    website: z.string().max(0).optional(), // bal küpü
    elapsedMs: z.number().int().min(0),
  })
  .refine((d) => !!d.email || !!d.phone, { message: "E-posta veya telefon girin", path: ["email"] });

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website || data.elapsedMs < 3000) return { ok: true as const }; // bot: sessizce yok say
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for") ?? "unknown";
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ventos:" + ip));
    const ipHash = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin.from("quote_requests").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
    if ((count ?? 0) >= 3) throw new Error("Çok fazla talep gönderildi. Lütfen birkaç dakika sonra tekrar deneyin.");
    const { error } = await supabaseAdmin.from("quote_requests").insert({
      services: data.services,
      package_slug: data.packageSlug ?? null,
      sector: data.sector,
      description: data.description,
      start_time: data.startTime || null,
      name: data.name,
      business: data.business || null,
      email: data.email || null,
      phone: data.phone || null,
      ip_hash: ipHash,
    });
    if (error) throw new Error("Talep kaydedilemedi. Lütfen tekrar deneyin.");
    return { ok: true as const };
  });
