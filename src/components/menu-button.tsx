import { MenuButtonProps } from "@/types/props";
import Link from "next/link";
import { forwardRef, Ref } from "react";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ title, explanation, url, color, type, onClickEffect, ...rest }, ref) => {
    const DivButton = () => (
      <button
        className={`relative group inline-block px-5 py-5 focus:text-white hover:text-white focus:border-2 focus:border-dashed hover:border-2 hover:border-dashed text-gray-400  border-gray-500 rounded-lg text-6xl sm:text-8xl font-drunkenhour ${color}`}
        {...rest}
        ref={ref}
        onClick={onClickEffect}
        datatype="menu-button"
      >
        {title}
        <span className="absolute font-serif bottom-0 right-0 mb-1 mr-1 text-xl text-gray-100 bg-black bg-opacity-70 px-5 py-3 rounded opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none">
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
