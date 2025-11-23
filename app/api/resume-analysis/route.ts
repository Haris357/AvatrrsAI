import { NextRequest, NextResponse } from 'next/server';
import { geminiAI } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { success: false, error: 'Resume text is required' },
        { status: 400 }
      );
    }

    const analysis = await geminiAI.analyzeResume(resumeText);

    return NextResponse.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}