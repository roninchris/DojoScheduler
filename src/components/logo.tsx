import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="48"
      height="48"
      {...props}
    >
      <path
        d="M20,85 V25 C20,15 30,15 30,25 V85 H20 z"
        fill="currentColor"
      />
      <path
        d="M80,85 V25 C80,15 70,15 70,25 V85 H80 z"
        fill="currentColor"
      />
      <path
        d="M10,25 H90 C95,25 95,20 90,20 H10 C5,20 5,25 10,25 z"
        fill="currentColor"
      />
      <path
        d="M5,35 H95 C100,35 100,30 95,30 H5 C0,30 0,35 5,35 z"
        fill="currentColor"
      />
       <path
        d="M35,45 H65 C70,45 70,40 65,40 H35 C30,40 30,45 35,45 z"
        fill="currentColor"
      />
    </svg>
  );
}
