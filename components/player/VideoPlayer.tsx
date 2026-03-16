'use client';

import React, { useState, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="w-full aspect-video bg-zinc-900 animate-pulse rounded-xl"></div>;

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
      <iframe
        src={url || undefined}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        title="Video Player"
      ></iframe>
    </div>
  );
}
