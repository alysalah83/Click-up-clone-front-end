function SkeletonLoader({
  height = "h-2",
  width = "w-full",
  count = 1,
  rounded = "rounded-lg",
  bgColor = "bg-neutral-800",
}: {
  height?: `h-${number | string}`;
  width?: `w-${number | string}`;
  count?: number;
  rounded?: `rounded-${string}`;
  bgColor?: `bg-${string}-${number}`;
}) {
  const countArr = Array.from({ length: count }, (_, i: number) => i);
  return (
    <>
      {countArr.map((index: number) => (
        <div
          className={`relative ${height} ${width} overflow-hidden ${rounded} ${bgColor}`}
          key={`skelton-number-${index}`}
        >
          <div className="animate-skelton absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-neutral-200/30 to-transparent" />
        </div>
      ))}
    </>
  );
}

export default SkeletonLoader;
