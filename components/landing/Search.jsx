"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebounce((searchText) => {
        const params = new URLSearchParams(searchParams);
        if (searchText) {
            params.set("search", searchText);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
                onChange={(e) => handleChange(e.target.value)}
                defaultValue={searchParams.get("search")?.toString() || ""}
            />
        </div>
    );
};

export default Search;
