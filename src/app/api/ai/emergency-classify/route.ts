import { NextRequest, NextResponse } from 'next/server';
import { aiEngine } from '@/lib/ai/aiEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await aiEngine('emergency-classify', body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
