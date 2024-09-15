import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
}

function Skeleton({
  className,
  height = "h-6",
  width = "w-full",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700", 
        height,
        width,
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
