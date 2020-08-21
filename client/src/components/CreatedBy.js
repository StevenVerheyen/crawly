import React from 'react';

export default function CreatedBy() {
  return (
    <div className="w-full mt-16 mb-4">
      <p className="text-sm text-gray-500 text-center px-2">
        This project is created with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        by{' '}
        <a
          href="https://www.stevenverheyen.be"
          className="text-green-500 hover:text-green-700"
        >
          Steven Verheyen
        </a>
      </p>
    </div>
  );
}
