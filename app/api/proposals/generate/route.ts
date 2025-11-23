import { NextRequest, NextResponse } from 'next/server';
import { geminiAI } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    const proposalRequest = await request.json();

    if (!proposalRequest.userProfile || !proposalRequest.jobPosting) {
      return NextResponse.json(
        { success: false, error: 'User profile and job posting are required' },
        { status: 400 }
      );
    }

    const proposal = await geminiAI.generateProposal(proposalRequest);

    return NextResponse.json({
      success: true,
      data: proposal
    });
  } catch (error) {
    console.error('Proposal generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}