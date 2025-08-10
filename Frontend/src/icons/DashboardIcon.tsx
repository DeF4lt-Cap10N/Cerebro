import { type JSX } from "react";

export function DashboardIcon({ className = "w-6 h-6" }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.44.981-.66 1.522-.66s1.082.22 1.522.66l8.955 8.955M12 21V16.5M12 21h7.5V12M12 21H4.5V12"
      />
    </svg>
  );
}