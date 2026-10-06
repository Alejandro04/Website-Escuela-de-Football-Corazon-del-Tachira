type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className = "",
}: SectionTitleProps) {
  const isCenter = align === "center";
  const textColor = tone === "light" ? "text-brand-white" : "text-brand-black";
  const subColor = tone === "light" ? "text-brand-white/80" : "text-brand-black/70";
  const lineColor = "bg-brand-red";

  return (
    <div
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex ${isCenter ? "justify-center" : ""} items-center gap-3 mb-4`}
        >
          <span className={`h-px w-10 ${lineColor}`} aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-display text-4xl leading-none sm:text-5xl md:text-6xl lg:text-7xl ${textColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${subColor}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}