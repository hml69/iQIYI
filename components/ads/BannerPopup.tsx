'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';

export default function BannerPopup() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 3000); // Show after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleClose}
      footer={null}
      closable={true}
      centered
      width={600}
      styles={{ body: { padding: 0 } }}
      className="overflow-hidden rounded-xl"
    >
      <a 
        href="https://example.com/sponsor" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative w-full aspect-video bg-zinc-900 flex items-center justify-center cursor-pointer group"
      >
        <Image
          src="https://picsum.photos/seed/ad/600/338"
          alt="Advertisement"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 text-xs rounded">
          Quảng cáo
        </div>
      </a>
    </Modal>
  );
}
