import { NextRequest, NextResponse } from 'next/server';
import { jobAPIClient } from '@/lib/jobs/api-clients';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      query: searchParams.get('query') || undefined,
      location: searchParams.get('location') || undefined,
      remote: searchParams.get('remote') === 'true',
      jobType: searchParams.get('jobType')?.split(',') || undefined,
      salaryMin: searchParams.get('salaryMin') ? parseInt(searchParams.get('salaryMin')!) : undefined,
      salaryMax: searchParams.get('salaryMax') ? parseInt(searchParams.get('salaryMax')!) : undefined,
      skills: searchParams.get('skills')?.split(',') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
    };

    const jobs = await jobAPIClient.searchJobs(params);

    return NextResponse.json({
      success: true,
      data: jobs,
      total: jobs.length,
      page: params.page,
      limit: params.limit
    });
  } catch (error) {
    console.error('Job search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search jobs' },
      { status: 500 }
    );
  }
}