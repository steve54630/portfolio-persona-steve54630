import { MenuButtonProps } from "@/types/props";
import Link from "next/link";
import { forwardRef } from "react";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ title, explanation, url, color, type, onClickEffect, ...rest }, ref) => {
    const DivButton = () => (
      <button
        className={`group flex flex-col items-center gap-1 rounded-lg border-2 border-transparent px-5 py-3 text-gray-400 transition-colors hover:border-dashed hover:border-gray-500 hover:text-white focus:border-dashed focus:border-gray-500 focus:text-white ${color}`}
        {...rest}
        ref={ref}
        onClick={onClickEffect}
        datatype="menu-button"
      >
        <span className="font-drunkenhour text-[min(9vh,3rem)] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-[min(9vh,3.75rem)] md:text-[min(9vh,4.5rem)] lg:text-[min(9vh,6rem)]">
          {title}
        </span>
        <span className="font-sans text-sm text-gray-300 drop-shadow-[0_1px_3px_rgba(0,0,0,1)] transition-colors group-hover:text-white group-focus:text-white sm:text-base">
          {explanation}
        </span>
      </button>
    );

    if (type === "link" && url)
      return (
        <Link href={url}>
          <DivButton />
        </Link>
      );

    if (type === "button") return <DivButton />;
  }
);

MenuButton.displayName = "MenuButton";

export default MenuButton;
