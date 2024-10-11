import React, { Fragment, useState } from "react";
import { categoriesListState, MenuCategory } from "@/store/menu";
import { useRecoilValue } from "recoil";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import Category from "@/app/(dashboard)/panel/menu/_components/Category";

interface CategoriesListProps {}

const CategoriesList: React.FC<CategoriesListProps> = () => {
  const menuCategories: MenuCategory[] = useRecoilValue(categoriesListState);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openFirstTab = () => {
    setSelectedIndex(0);
  };

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <TabList>
        <div className="mb-7 border-b border-slate-100">
          <div className="mb-5 ml-0 w-full overflow-x-auto whitespace-nowrap rounded-2xl bg-gray-100 p-1 md:w-fit">
            {menuCategories.map((category) => (
              <Tab key={category.id} as={Fragment}>
                {({ selected }) => (
                  <div
                    className={clsx(
                      "inline-flex cursor-pointer items-center rounded-xl px-4 py-2 font-medium transition-colors duration-100 focus:relative",
                      !selected && "text-gray-500 hover:text-gray-700",
                      selected &&
                        "pointer-events-none bg-white text-primary-500 shadow",
                    )}
                  >
                    {category.name}
                  </div>
                )}
              </Tab>
            ))}
          </div>
        </div>
      </TabList>

      <TabPanels>
        {menuCategories.map((category) => (
          <TabPanel key={category.id}>
            <Category category={category} openFirstTab={openFirstTab} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default CategoriesList;
