import { MenuButtonProps } from "@/types/props";
import Link from "next/link";
import { forwardRef, Ref } from "react";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ title, explanation, url, color, ...rest }, ref) => {
    return (
      <Link href={url}>
        <button
          className={`relative group inline-block px-5 py-5 focus:border-2 focus:border-dashed hover:border-2 hover:border-dashed border-gray-500 rounded-lg text-6xl sm:text-8xl font-drunkenhour ${color}`}
          {...rest}
        >
          {title}
          <span className="absolute font-serif bottom-0 right-0 mb-1 mr-1 text-xl text-gray-300 bg-black bg-opacity-70 px-5 py-3 rounded opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none">
            {explanation}
          </span>
        </button>
      </Link>
    );
  }
);

MenuButton.displayName = "MenuButton";

export default MenuButton;
