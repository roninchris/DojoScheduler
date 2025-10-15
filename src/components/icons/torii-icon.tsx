import { SVGProps } from 'react';

export function ToriiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2" />
      <path d="M4 9h16" />
      <path d="M18 9v11" />
      <path d="M6 9v11" />
    </svg>
  );
}