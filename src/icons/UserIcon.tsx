import React from "react";

export default function UserIcon({ fill, duration, transition }: IconProps) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className={`${fill} ${duration} ${transition}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M8.49935 7.99967C10.3403 7.99967 11.8327 6.50729 11.8327 4.66634C11.8327 2.82539 10.3403 1.33301 8.49935 1.33301C6.6584 1.33301 5.16602 2.82539 5.16602 4.66634C5.16602 6.50729 6.6584 7.99967 8.49935 7.99967Z"
      />
      <path d="M8.49945 9.66699C5.15945 9.66699 2.43945 11.907 2.43945 14.667C2.43945 14.8537 2.58612 15.0003 2.77279 15.0003H14.2261C14.4128 15.0003 14.5594 14.8537 14.5594 14.667C14.5594 11.907 11.8395 9.66699 8.49945 9.66699Z" />
    </svg>
  );
}
