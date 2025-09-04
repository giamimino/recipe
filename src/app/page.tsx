'use client'
import Search from "@/components/ui/search";
import { useDebounce } from "@/hooks/useDebounce";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
const ForYou = dynamic(() => import("@/components/common/ForYou"), {
  ssr: false
});

export default function Home() {
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearch = useDebounce(searchValue)
  const router = useRouter()

  useEffect(() => {
    if (!debouncedSearch) return;
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  function handleSearch(value: string) {
    router.push(`/all?s=${value}`)
  }
  

  return (
    <div className="flex flex-col gap-16">
      <div className="mt-[10vh] w-full flex items-center relative
      flex-col gap-2">
        <h1 className="">Search for any recepie</h1>
        <Search 
          onChange={(value: string) => setSearchValue(value)}
          value={searchValue}
          requestSearch={handleSearch}
        />
      </div>
      <main>
        <h1 className="text-center text-2xl font-semibold">For You</h1>
        <ForYou />
      </main>
    </div>
  );
}
