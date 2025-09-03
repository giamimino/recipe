'use client'
import Header from "@/components/header";
import Search from "@/components/ui/search";
import { useDebounce } from "@/hooks/useDebounce";
import dynamic from "next/dynamic";
// import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
const ForYou = dynamic(() => import("@/components/common/ForYou"), {
  ssr: false
});

export default function Home() {
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearch = useDebounce(searchValue)

  useEffect(() => {
    if (!debouncedSearch) return;
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  

  return (
    <div className="flex flex-col gap-16">
      <Header />
      <div className="mt-[10vh] w-full flex items-center relative
      flex-col gap-2">
        <h1 className="">Search for any recepie</h1>
        <Search 
          onChange={(value: string) => setSearchValue(value)}
          value={searchValue}
        />
      </div>
      <main>
        <h1 className="text-center text-2xl font-semibold">For You</h1>
        <ForYou />
      </main>
    </div>
  );
}
