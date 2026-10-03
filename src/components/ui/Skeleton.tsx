import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", ...props }) => {
  return (
    <div
      className={`shimmer-loading rounded-xl ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
};
