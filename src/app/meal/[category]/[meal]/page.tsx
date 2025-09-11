"use client";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { countries } from "country-data";
import Ingredient from "@/components/ui/Ingredient";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SessionContext } from "@/context/SessionContext";
import { removeSaveMeal, saveMeal } from "@/lib/actions/actions";

type PageProps = {
  params: Promise<{
    meal: string;
    category: string;
  }>;
};

type IngredientsType = {
  ingredient: string,
  measure: string
}
export default function MealPage({ params }: PageProps) {
  const { meal, category } = React.use(params);
  const session = useContext(SessionContext);
  const [data, setData] = useState<Meal>();
  const [savesQTY, setSavesQTY] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${
        meal.split("-")[1]
      }`
    )
      .then((res) => res.json())
      .then((data) => setData(data.meals[0]));
  }, []);

  const allIngredients = useMemo(() => {
    if (!data) return;
    let ingredients: IngredientsType[] = []

    for(let i = 1; i < 20; i++) {
      const ingredient = data[`strIngredient${i}` as keyof typeof data] as string | null;
      const measure = data[`strMeasure${i}` as keyof typeof data] as string | null;

      if
      (
        ingredient?.trim() !== "" && ingredient &&
        measure?.trim() !== "" && measure
      ) {
        ingredients.push({
          ingredient,
          measure,
        })
      }
    }
    return ingredients
  }, [data]);

  const difficulty = useMemo(() => {
    const length = allIngredients?.length ?? 0;

    if (length === 0) return;
    switch (true) {
      case length >= 1 && length <= 5: // 1-5
        return "easy";
      case length >= 6 && length <= 10: //6-10
        return "medium";
      default:
        return "hard"; // 11+
    }
  }, [allIngredients]);

  const area = useMemo(() => {
    if (!data) return;

    let result = countries.all.find(
      (c) => c.name === data.strArea.slice(0, data.strArea.length - 1)
    )?.alpha2;

    if (result === undefined) {
      result = "GB";
    }

    return result;
  }, [data]);

  const instructions = useMemo(() => {
    if (!data || !data.strInstructions) return [];
    const result = data.strInstructions.split("\r\n")
    return result
  }, [data]);

  const embedUrl = useMemo(() => {
    if(!data) return
    const url = new URL(data.strYoutube)

    if(url) {
      const videoId = url.searchParams.get("v")
      return `https://www.youtube.com/embed/${videoId}`
    } else {
      return null
    }
  }, [data])

  useEffect(() => {
    if(!session && !data) return;
    const fetchSaves = async (m: string, c: string) => {
      const res = await fetch("/api/savedCount", {
        method: "POST",
        headers: {"Content-Type": "Application/json"},
        body: JSON.stringify({ meal: m, mealCode: c})
      });
      const data = await res.json()
      if(data.success) {
        setSavesQTY(data.count)
        console.log(data);
      }
        console.log(data);
    }
    // @ts-ignore
    fetchSaves(data?.strMeal, data?.idMeal)
    setIsSaved(() => {
      let newIsSaved = session?.saves?.some(
        (s) => s?.meal && data?.strMeal && s.meal.toLowerCase() === data.strMeal.toLowerCase()
      ) ?? false

      return newIsSaved
    })
  }, [session])
 

  const handleSave = async () => {;
    // @ts-ignore
    const result = await saveMeal(session.id, data.idMeal, data?.strMeal);

    if(result.success) {
      const url = new URL(window.location.href)
      url.searchParams.set("meal", JSON.stringify(result.saved))
      window.history.replaceState({}, "", url)
    } else {
      alert(result.message || "Something went wrong.");
    }
  };

  const handleRemove = async () => {;
    const result = await removeSaveMeal(session?.saves?.find((s) => s.meal.toLowerCase() === data?.strMeal.toLowerCase())?.id || "");

    if(result.success && result.id) {
      const url = new URL(window.location.href)
      url.searchParams.set("del", result.id.id)
      window.history.replaceState({}, "", url)
    } else {
      alert(result.message || "Something went wrong.");
    }
  };


  if (!data)
    return (
      <div className="flex flex-col p-16 font-medium">
        <p>Unfortunately, no recipe was found.</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-8 pb-8 pl-32 max-[768px]:pl-8">
      <div className="h-14 w-full"></div>
      <div className="flex gap-7 max-[768px]:gap-3 w-full flex-wrap">
        <Image
          src={`${data.strMealThumb}/medium`}
          alt={data.strMeal}
          width={350}
          height={350}
          priority
          className="rounded-xl aspect-square"
        />
        <div className="flex flex-col gap-1.5 p-3 h-[350px] max-[815px]:h-fit">
          <div className="flex gap-1 items-center">
            <h1 className="text-black text-xl font-semibold">{data.strMeal}</h1>
            <p className="opacity-70 text-black text-sm mt-auto">
              {data.strCategory}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <span>{savesQTY}</span>
              <Icon icon={isSaved ? "mdi:heart" : "mdi:heart-outline"} 
              className={`${isSaved ? "text-red-600" : "text-black"} cursor-pointer`}
              onClick={() => isSaved ? handleRemove() : handleSave()}
              />
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {data.strTags &&
              data.strTags.split(",").map((tag) => (
                <div
                  key={tag}
                  className="px-2.5 py-1 rounded-2xl bg-gray-200 w-fit"
                >
                  <span>{tag}</span>
                </div>
              ))}
          </div>
          <div className="mt-auto max-[815px]:mt-0 flex flex-col">
            <Image
              src={`https://flagsapi.com/${area}/shiny/64.png`}
              width={64}
              height={64}
              alt={data.strArea}
              priority
              className="max-[815px]:order-2"
            />
            <p className="text-black max-[815px]:order-1">
              {`This meal is ${data.strArea}`}
            </p>
            <p className="text-black/80">
              {difficulty === "medium"
                ? `This meal is of ${difficulty} difficulty to cook.`
                : `This meal is ${difficulty} to cook.`}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-black text-2xl max-[768px]:text-xl font-semibold text-center">
          Ingredients
        </h1>
        <div className="flex flex-wrap gap-4 p-8 justify-start max-[500px]:p-2">
          {allIngredients?.map((ingredient, index) => (
            <Ingredient
              key={ingredient.ingredient + index}
              ingredient={ingredient.ingredient}
              measure={ingredient.measure}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-black text-2xl max-[768px]:text-xl font-semibold">
          Instructions
        </h1>
        <div className="flex flex-col">
          {instructions?.map(
            (i, index) => {
              const firstChar = i.trim()[0];
              const isNumber = !isNaN(Number(firstChar));
              return (
                  <span key={i+index} style={{
                    marginTop: `${isNumber ? "15px" : "0"}`
                  }}>
                    {index === 0 ? "1." : ""} {i}<br />
                  </span>
                )}
              )}
        </div>
      </div>
      {data.strYoutube && embedUrl && 
      <div>
        <h1 className="font-semibold">Play YouTube Video</h1>
        <iframe
          width={560}
          height={315}
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
      </div>}
      {data.strSource && 
      <div>
        <h1>source -
        <Link href={data.strSource} target="_blank"
        className="underline text-blue-500 hover:text-blue-700"> Click me</Link>
        </h1>
      </div>}
    </div>
  );
}
