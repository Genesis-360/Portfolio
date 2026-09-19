import Image from "next/image";
import Link from "next/link";
import { FooterLogo } from "./FooterLogo";
import { footerData } from "./footer-data";

const { brand, groups, socials, copyright } = footerData;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-block py-[5px] text-[15px] font-medium leading-[20px] text-[#0a0a0a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a] sm:py-[3px] lg:py-[4px]"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group relative inline-block py-[5px] text-[15px] font-medium leading-[20px] text-[#0a0a0a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a] sm:py-[3px] lg:py-[4px]"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#16301c] px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/footer-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* White card */}
      <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[20px] bg-white sm:rounded-[28px] lg:rounded-[28px]">
        {/* Desktop grid */}
        <div className="hidden lg:grid" style={{ gridTemplateColumns: "1.25fr 1fr 1fr 1.3fr", gridTemplateRows: "auto minmax(3.5rem, auto) 11.5rem" }}>
          {/* Group 1 - Services */}
          <nav aria-labelledby="footer-services" className="border-b border-[#ececec] border-r border-solid" style={{ gridColumn: "1", gridRow: "1", paddingLeft: "64px", paddingTop: "32px", paddingBottom: "28px" }}>
            <h2 id="footer-services" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[0].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[0].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group 2 - Growth */}
          <nav aria-labelledby="footer-growth" className="border-b border-[#ececec] border-r border-solid" style={{ gridColumn: "2", gridRow: "1", paddingLeft: "16px", paddingRight: "16px", paddingTop: "32px", paddingBottom: "28px" }}>
            <h2 id="footer-growth" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[1].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[1].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group 3 - Resources */}
          <nav aria-labelledby="footer-resources" className="border-b border-[#ececec] border-r border-solid" style={{ gridColumn: "3", gridRow: "1", paddingLeft: "16px", paddingRight: "16px", paddingTop: "32px", paddingBottom: "28px" }}>
            <h2 id="footer-resources" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[2].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[2].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group 4 - Company */}
          <nav aria-labelledby="footer-company" className="border-b border-[#ececec] border-r border-solid" style={{ gridColumn: "4", gridRow: "1 / 3", paddingLeft: "16px", paddingRight: "18px", paddingTop: "32px", paddingBottom: "28px" }}>
            <h2 id="footer-company" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[3].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[3].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo - spans columns 1-3, rows 2-3 */}
          <div className="flex items-center " style={{ gridColumn: "1 / 4", gridRow: "2 / 4", paddingLeft: "64px", paddingTop: "56px", paddingBottom: "56px" }}>
            <FooterLogo name={brand.name} href={brand.href} className="text-[clamp(7rem,16vw,15rem)]" />
          </div>

          {/* Meta - socials + copyright in column 4, row 3 */}
          <div className="flex flex-col justify-center border-r border-solid border-[#ececec]" style={{ gridColumn: "4", gridRow: "3", paddingLeft: "16px", paddingRight: "18px" }}>
            <ul className="mb-4 flex gap-8" aria-label="Social media">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium leading-[20px] text-[#0a0a0a] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a]"
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[13px] leading-[20px] text-[#767676]">{copyright}</p>
          </div>
        </div>

        {/* Mobile / Tablet grid */}
        <div className="grid lg:hidden" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Group 1 - Services */}
          <nav aria-labelledby="footer-services-mobile" className="border-b border-[#ececec] border-r border-solid p-5 sm:p-8" style={{ gridColumn: "1", gridRow: "1" }}>
            <h2 id="footer-services-mobile" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[0].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[0].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group 2 - Growth */}
          <nav aria-labelledby="footer-growth-mobile" className="border-b border-[#ececec] p-5 sm:p-8" style={{ gridColumn: "2", gridRow: "1" }}>
            <h2 id="footer-growth-mobile" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[1].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[1].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group 3 - Resources */}
          <nav aria-labelledby="footer-resources-mobile" className="border-b border-[#ececec] border-r border-solid p-5 sm:p-8" style={{ gridColumn: "1", gridRow: "2" }}>
            <h2 id="footer-resources-mobile" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[2].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[2].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group 4 - Company */}
          <nav aria-labelledby="footer-company-mobile" className="border-b border-[#ececec] p-5 sm:p-8" style={{ gridColumn: "2", gridRow: "2" }}>
            <h2 id="footer-company-mobile" className="mb-9 text-[13px] font-normal leading-none text-[#767676]">
              {groups[3].title}
            </h2>
            <ul className="flex flex-col gap-2">
              {groups[3].links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo - spans both columns */}
          <div className="flex items-center justify-center border-b border-[#ececec] py-8 sm:py-10" style={{ gridColumn: "1 / 3", gridRow: "3" }}>
            <FooterLogo name={brand.name} href={brand.href} className="text-[clamp(3.5rem,22vw,11rem)]" />
          </div>

          {/* Meta - socials + copyright */}
          <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left" style={{ gridColumn: "1 / 3", gridRow: "4" }}>
            <ul className="flex flex-wrap gap-6" aria-label="Social media">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium leading-[20px] text-[#0a0a0a] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a]"
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[13px] leading-[20px] text-[#767676]">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
