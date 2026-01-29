import React from 'react';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`skeleton-shimmer rounded-md ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
