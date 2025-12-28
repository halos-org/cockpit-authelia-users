import { Skeleton } from "@patternfly/react-core";

export interface LoadingSkeletonProps {
  rows?: number;
}

export function LoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
  return (
    <div>
      {/* Table header skeleton */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Skeleton width="15%" height="1.5rem" />
        <Skeleton width="20%" height="1.5rem" />
        <Skeleton width="25%" height="1.5rem" />
        <Skeleton width="15%" height="1.5rem" />
        <Skeleton width="10%" height="1.5rem" />
        <Skeleton width="15%" height="1.5rem" />
      </div>
      {/* Table rows skeleton */}
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "0.75rem",
            alignItems: "center",
          }}
        >
          <Skeleton width="15%" height="1rem" />
          <Skeleton width="20%" height="1rem" />
          <Skeleton width="25%" height="1rem" />
          <Skeleton width="15%" height="1rem" />
          <Skeleton width="10%" height="1rem" />
          <Skeleton width="15%" height="1rem" />
        </div>
      ))}
    </div>
  );
}
