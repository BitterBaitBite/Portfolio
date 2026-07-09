export default function InternalLinkIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="fill"
      height="fill"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11 21H12C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3H11M11 16L15 12M15 12L11 8M15 12H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
