import { NextResponse } from 'next/server';
import { z } from 'zod';
import { analyzeHtml, analyzeUrl } from '@/lib/seoAnalyzer';
import { tryAiRewrite } from '@/lib/openai';

const Body = z.object({
  url: z.string().url().optional(),
  html: z.string().min(1).optional(),
  keywords: z.array(z.string().min(1)).max(10).optional(),
  useAi: z.boolean().optional()
}).refine(v => v.url || v.html, { message: 'Provide either url or html' });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = Body.parse(json);

    let result = body.url
      ? await analyzeUrl(body.url, body.keywords)
      : analyzeHtml(body.html!, undefined, body.keywords);

    if (body.useAi) {
      const ai = await tryAiRewrite({
        pageTitle: result.page.title,
        description: result.page.description,
        textSample: result.page.textSample,
        targetKeywords: body.keywords
      });
      if (ai) {
        (result as any).aiSuggestions = ai;
      }
    }

    return NextResponse.json(result);
  } catch (e: any) {
    const msg = e?.message || 'Invalid request';
    return new NextResponse(msg, { status: 400 });
  }
}
