"use client";

import Link from "next/link";
import { track } from "@/lib/track";

type Props = {
  href: string;
  event: string;
  params?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

export default function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  external,
  download,
  ariaLabel,
}: Props) {
  const onClick = () => track(event, params);

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { target: "_blank", rel: "noopener" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
