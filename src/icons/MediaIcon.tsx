import type { IconProps } from "./BookIcon";

export default function MediaIcon({ fill, size = 16, duration, transition }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={`${fill} ${duration} ${transition}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z"
      />
      <path d="M6.06641 7.99999V7.01333C6.06641 5.73999 6.96641 5.22666 8.06641 5.85999L8.91974 6.35333L9.77307 6.84666C10.8731 7.47999 10.8731 8.51999 9.77307 9.15333L8.91974 9.64666L8.06641 10.14C6.96641 10.7733 6.06641 10.2533 6.06641 8.98666V7.99999Z" />
    </svg>
  );
}
