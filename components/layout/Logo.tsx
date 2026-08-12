import Image from "next/image";

type LogoProps = {
  /** "dark" = plain, for light backgrounds (Header). "light" = wrapped in a
   * white card so the logo's dark wordmark stays legible on dark backgrounds. */
  variant?: "dark" | "light";
  className?: string;
  /** Rendered logo height in px — width follows the source image's aspect ratio. */
  height?: number;
};

const LOGO_ASPECT = 2548 / 733;

export default function Logo({ variant = "dark", className = "", height = 36 }: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="CERS, Center for Environmental Research & Sustainability"
      width={Math.round(height * LOGO_ASPECT)}
      height={height}
      priority
      className="h-full w-auto object-contain"
    />
  );

  if (variant === "light") {
    return (
      <span
        className={`inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 ${className}`}
        style={{ height: height + 12 }}
      >
        {image}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`} style={{ height }}>
      {image}
    </span>
  );
}
