type TechLogoProps = {
  name: string;
};

export default function TechLogo({ name }: TechLogoProps) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const logos: Record<string, JSX.Element> = {
    react: (
      <g fill="none" stroke="#61DAFB" strokeWidth="2.5">
        <ellipse cx="24" cy="24" rx="21" ry="8" />
        <ellipse cx="24" cy="24" rx="21" ry="8"
          transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="21" ry="8"
          transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="4" fill="#61DAFB" stroke="none" />
      </g>
    ),

    nextjs: (
      <>
        <circle cx="24" cy="24" r="22" fill="#080d0f" stroke="#dce5e2" />
        <path
          d="M15 33V15L34 38M32 15V29"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),

    typescript: (
      <>
        <rect x="3" y="3" width="42" height="42"
          rx="4" fill="#3178C6" />
        <text x="9" y="35" fontSize="25"
          fontWeight="700" fill="#FFFFFF"
          fontFamily="Arial, sans-serif">TS</text>
      </>
    ),

    tailwind: (
      <path
        d="M2 19C7 8 15 7 24 15C31 22 38 22 46 12C41 26 32 29 23 21C15 13 8 12 2 19ZM2 32C7 21 15 20 24 28C31 35 38 35 46 25C41 39 32 42 23 34C15 26 8 25 2 32Z"
        fill="#06B6D4"
      />
    ),

    git: (
      <>
        <rect x="8" y="8" width="32" height="32"
          rx="4" fill="#F05032"
          transform="rotate(45 24 24)" />
        <path d="M15 10L33 28M22 17V34"
          stroke="white" strokeWidth="3"
          strokeLinecap="round" fill="none" />
        <circle cx="22" cy="17" r="4" fill="white" />
        <circle cx="33" cy="28" r="4" fill="white" />
        <circle cx="22" cy="34" r="4" fill="white" />
      </>
    ),

    vite: (
      <>
        <path d="M2 8L46 8L24 46Z" fill="#8B5CF6" />
        <path d="M27 1L14 25L25 22L21 39L36 13L24 16Z"
          fill="#FFDA38" />
      </>
    ),

    nodejs: (
      <>
        <path
          d="M24 2L44 13V35L24 46L4 35V13Z"
          stroke="#83CD29"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
        <text x="11" y="31" fontSize="21"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#83CD29">JS</text>
      </>
    ),

    figma: (
      <g transform="translate(8 0)">
        <path
          d="M16 0H8A8 8 0 0 0 8 16H16Z"
          fill="#F24E1E"
        />
        <path
          d="M16 0H24A8 8 0 0 1 24 16H16Z"
          fill="#FF7262"
        />
        <path
          d="M16 16H8A8 8 0 0 0 8 32H16Z"
          fill="#A259FF"
        />
        <circle cx="24" cy="24" r="8" fill="#1ABCFE" />
        <path
          d="M16 32H8A8 8 0 1 0 16 40Z"
          fill="#0ACF83"
        />
      </g>
    ),
  };

  const aliases: Record<string, string> = {
    tailwindcss: "tailwind",
    next: "nextjs",
    ts: "typescript",
    node: "nodejs",
    gitgithub: "git",
    reactjs: "react",
  };

  const logo = logos[aliases[key] || key];

  if (!logo) {
    return (
      <span className="sp-tech-fallback">
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      className="sp-brand-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {logo}
    </svg>
  );
}
