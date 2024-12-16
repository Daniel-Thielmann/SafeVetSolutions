'use client';
import { useParams } from 'next/navigation'

export function usePathId() {
  const params = useParams<{ id: string }>();
  return params.id;
}
