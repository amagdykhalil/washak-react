import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getFullPath } from "../../helper/getFullPath";

export default function MenuItem({ item, isSub = false, slug = '' }) {
    const [open, setOpen] = useState(false);

    return (
        <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {item?.page_type === 'custom_page' ? (
                <a
                    href={item.href}
                    target={item.target || "_self"}
                    className="navlink flex items-center whitespace-nowrap text-[var(--black-2)]"
                >
                    <span className="px-2 py-1 font-medium transition-colors duration-200">
                        {item.text || "Menu Item"}
                    </span>

                    {item.children?.length > 0 && (
                        <ChevronDown
                            className={`w-4 h-4 stroke-[3px] transition-transform !mt-[4px] duration-300
                    ${isSub ? "-rotate-90" : ""}
                    ${open && !isSub ? "rotate-180" : ""}`}
                        />
                    )}
                </a>

            ) : (
                <NavLink
                    to={getFullPath(isSub ? slug : item.page_slug, item.href)}
                    target={item.target || "_self"}
                    className={({ isActive }) =>
                        `navlink flex items-center whitespace-nowrap ${isActive ? "active text-[var(--main)]" : "text-[var(--black-2)]"
                        }`
                    }
                >
                    <span className="px-2 py-1 font-medium transition-colors duration-200">
                        {item.text || "Menu Item"}
                    </span>

                    {item.children?.length > 0 && (
                        <ChevronDown
                            className={`w-4 h-4 stroke-[3px] transition-transform !mt-[4px] duration-300
                    ${isSub ? "-rotate-90" : ""}
                    ${open && !isSub ? "rotate-180" : ""}`}
                        />
                    )}
                </NavLink>
            )
            }


            {
                item.children?.length > 0 && (
                    <ul
                        className={`absolute bg-white shadow-lg rounded-lg transition-all duration-500 ease-in-out min-w-[180px] z-50
                    ${open ? "max-h-[400px] opacity-100 translate-y-0" : "overflow-hidden max-h-0 opacity-0 -translate-y-2"}
                    ${isSub ? "left-full top-0" : "right-0 mt-2"}
                `}
                    >
                        {item.children.map((child, idx) => (
                            <MenuItem key={idx} item={child} isSub={true} slug={isSub ? slug : item.page_slug} />
                        ))}
                    </ul>

                )
            }
        </li >
    );
}
