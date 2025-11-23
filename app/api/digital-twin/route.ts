import { NextRequest, NextResponse } from 'next/server';
import { geminiAI } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    const { username, message, conversationHistory, userKnowledge } = await request.json();

    if (!username || !message) {
      return NextResponse.json(
        { success: false, error: 'Username and message are required' },
        { status: 400 }
      );
    }

    const response = await geminiAI.generateDigitalTwinResponse(
      userKnowledge,
      conversationHistory || [],
      message
    );

    return NextResponse.json({
      success: true,
      data: {
        response,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Digital twin error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}