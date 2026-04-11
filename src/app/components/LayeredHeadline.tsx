type LayeredHeadlineProps = {
  lines: string[];
  align?: "left" | "center";
  className?: string;
};

const lineRotations = [1, -1, 2, 0];

export function LayeredHeadline({
  lines,
  align = "left",
  className = "",
}: LayeredHeadlineProps) {
  return (
    <span
      className={`inline-flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className="inline-block rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black"
          style={{ transform: `rotate(${lineRotations[index] ?? 0}deg)` }}
        >
          {line}
        </span>
      ))}
    </span>
  );
}
