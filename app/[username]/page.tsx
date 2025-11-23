"use client";

import { PublicProfile } from '@/components/profile/PublicProfile';

interface PublicProfilePageProps {
  params: {
    username: string;
  };
}

export default function PublicProfilePage({ params }: PublicProfilePageProps) {
  return <PublicProfile username={params.username} />;
}