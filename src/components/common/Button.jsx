const VARIANTS = {
  primary: "bg-brand text-white hover:bg-blue-600 border border-brand",
  secondary: "bg-card text-ink hover:bg-line/60 border border-line",
  ghost:
    "bg-transparent text-ink-muted hover:bg-line/40 border border-transparent",
};

export default function Button({
  children,
  icon,
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}) {
  const sizing =
    size === "sm" ? "text-xs px-2.5 py-1.5" : "text-sm px-3.5 py-2";
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md font-semibold transition-colors ${sizing} ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
