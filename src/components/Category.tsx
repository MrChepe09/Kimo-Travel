import React, { SetStateAction, useContext, useState } from "react";
import { NextIcon } from "./icons/nextIcon";
import { ActivitiesProps, CategoriesProps } from "@/types/types";
import { AppContext } from "@/context/ApiContext";
import cn from "classnames";
import { useRouter } from "next/router";

const twc = {
  categoryContainer:
    "bg-light-cyan py-10 pl-17px pr-4 w-full lg:w-1/2 scrollbar-hide",
  headingCategory: "text-base font-bold text-dark-green plex-mono pb-4",
  category:
    "mb-2 p-6 plex-mono flex justify-between items-center bg-white cursor-pointer w-full rounded-lg",
  categoryTitle: "font-normal plex-mono text-base leading-5",
};

export type CategoryProps = {
  isIconEnabled?: boolean;
  className?: string;
  classNameContainer?: string;
  isActivity?: boolean;
};

export enum CATEGORY {
  ADVENTURE = "Adventure",
  HEADING = "Categories",
}

export const Category = ({
  isIconEnabled = true,
  className,
  classNameContainer,
  isActivity = true,
}: CategoryProps) => {
  const { data } = useContext(AppContext);
  const { categories } = data;
  const [isActive, setIsActive] = useState("" as CATEGORY);
  const filter =
    categories?.filter((d: CategoriesProps) => d.name === isActive) || [];
  const router = useRouter();
  const path = router.pathname.replace("/[id]", "") === "/activities";
  return (
    <div className={cn(twc.categoryContainer, classNameContainer)}>
      <p className={twc.headingCategory}>{CATEGORY.HEADING}</p>
      <div className={cn(className, "scrollbar-hide")}>
        {categories?.map((d: CategoriesProps, i: number) => (
          <div key={i}>
            <li
              className={cn(twc.category, {
                "min-w-[150px]": path,
              })}
              onClick={() => {
                if(isActive !== d.name){
                  setIsActive(d.name as SetStateAction<CATEGORY>)
                } else {
                  setIsActive("" as SetStateAction<CATEGORY>)
                }
              }}
            >
              <p
                className={cn(twc.categoryTitle, {
                  "w-full text-center": path,
                  "text-xl font-extrabold text-teal":
                    isActive === d.name,
                })}
              >
                {d.name}
              </p>
              {isIconEnabled && <NextIcon />}
            </li>
            {isActivity && isActive === d.name &&
              <div style={{ backgroundColor: 'white', borderRadius: '10px', marginTop: '-20px' }}>
              {filter[0]?.activities?.map((e: ActivitiesProps, i: number) => (
                <div className="mt-4" key={i}>
                  <li className={twc.category}>{e.title}</li>
                </div>
              ))}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
