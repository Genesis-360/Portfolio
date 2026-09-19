import Image from "next/image";

type LogoMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function LogoMark({ className = "", size = "lg" }: LogoMarkProps) {
  const sizes = {
    sm: { icon: 48, wordmark: "h-8", container: "py-4" },
    md: { icon: 64, wordmark: "h-10", container: "py-6" },
    lg: { icon: 80, wordmark: "h-14", container: "py-8" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-4 ${s.container} ${className}`}>
      <Image
        src="/header-logo.svg"
        alt="OREENZA logo"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        priority
      />
      <Image
        src="/wordmark.svg"
        alt="OREENZA"
        width={200}
        height={42}
        className={`${s.wordmark} w-auto`}
        priority
      />
    </div>
  );
}
