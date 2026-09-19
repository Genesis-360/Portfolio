import Link from "next/link";
import Image from "next/image";

type FooterLogoProps = {
  name: string;
  href?: string;
  className?: string;
};

export function FooterLogo({ name, href = "/", className = "" }: FooterLogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${name} home`}
      className={`flex items-center gap-4 ${className}`}
    >
      <Image
        src="/header-logo.svg"
        alt={`${name} logo`}
        width={80}
        height={80}
        className="h-[0.7em] w-auto"
        priority
      />
      <Image
        src="/wordmark-dark.svg"
        alt={name}
        width={200}
        height={42}
        className="h-[0.4em] w-auto"
        priority
      />
    </Link>
  );
}
