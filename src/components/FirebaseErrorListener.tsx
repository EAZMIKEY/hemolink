'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

export function FirebaseErrorListener() {
  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error) => {
      // In development, this will be caught by Next.js error overlay
      // if it's thrown. 
      throw error;
    });
    return () => unsubscribe();
  }, []);

  return null;
}
