import { atom, selector, selectorFamily, useRecoilCallback } from "recoil";

export const attributes = [
  "pikantne",
  "wegetariańskie",
  "wegańskie",
  "niskokaloryczne",
  "słodkie",
  "kwaśne",
  "łagodne",
  "z owocami",
  "wytrawne",
  "pieczone",
  "smażone",
  "grillowane",
  "ekologiczne",
  "domowe",
  "tradycyjne",
] as const;

export type Attribute = (typeof attributes)[number];

export type Status = "active" | "hidden";

type Space = "dashboard" | "listing";

type ItemDetails = "ingredients" | "allergens";

export interface MenuItem {
  id: string;
  order: number;
  name: string;
  price: number;
  magnitude: string;
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  attributes?: Attribute[];
  status?: Status;
}

export interface MenuCategory {
  id: string;
  order: number;
  name: string;
  icon?: number;
  description?: string;
  items?: MenuItem[];
  status?: Status;
}

const menuCategories: MenuCategory[] = [
  {
    id: "-hvlLh9hdG8NurlVjr73Y",
    order: 1,
    name: "Przystawki",
    icon: 12,
    description: "Tradycyjne polskie przystawki",
    status: "active",
    items: [
      {
        id: "-8alLh9jaf9TuelOi63Nt",
        order: 1,
        name: "Placki ziemniaczane z sosem czosnkowym",
        price: 20,
        magnitude: "3 sztuki",
        calories: 450,
        ingredients: ["ziemniaki", "mąka", "cebula", "czosnek"],
        allergens: ["gluten"],
        attributes: ["tradycyjne", "smażone", "domowe"],
        status: "active",
      },
      {
        id: "-Yu34h2weQ9RrtLx45Mf1",
        order: 2,
        name: "Sałatka z buraków z kozim serem",
        price: 22,
        magnitude: "250g",
        calories: 300,
        ingredients: ["buraki", "kozi ser", "rukola", "orzechy"],
        allergens: ["mleko", "orzechy"],
        attributes: [
          "tradycyjne",
          "wegetariańskie",
          "niskokaloryczne",
          "kwaśne",
          "domowe",
        ],
        status: "active",
      },
    ],
  },
  {
    id: "-MvLqUe77G3ZopJfYtn65",
    order: 2,
    name: "Dania główne",
    icon: 2,
    description: "Dania główne",
    status: "active",
    items: [
      {
        id: "-FqoRNh4HDfJw1u9OlYQ2",
        order: 1,
        name: "Bigos staropolski",
        price: 35,
        magnitude: "350g",
        calories: 550,
        ingredients: ["kapusta", "kiełbasa", "boczek", "grzyby", "śliwki"],
        allergens: [],
        attributes: [
          "tradycyjne",
          "pikantne",
          "wytrawne",
          "domowe",
          "pieczone",
        ],
        status: "active",
      },
      {
        id: "-PwzFQh3lGnTg1u0Am9Lr",
        order: 2,
        name: "Pierogi z kapustą i grzybami",
        price: 28,
        magnitude: "8 sztuk",
        calories: 400,
        ingredients: ["mąka", "kapusta", "grzyby"],
        allergens: ["gluten"],
        attributes: [
          "wegetariańskie",
          "tradycyjne",
          "ekologiczne",
          "domowe",
          "łagodne",
          "pieczone",
        ],
        status: "active",
      },
    ],
  },
  {
    id: "-XtqOvh9AfJytxDgN0M5P",
    order: 3,
    name: "Desery",
    icon: 8,
    description: "Słodkości",
    status: "active",
    items: [
      {
        id: "-RqlTh2pJ9FuM3eLozX4Q",
        order: 1,
        name: "Szarlotka z lodami waniliowymi",
        price: 18,
        magnitude: "150g",
        calories: 350,
        ingredients: ["jabłka", "mąka", "cukier", "cynamon", "lody waniliowe"],
        allergens: ["gluten", "mleko"],
        attributes: [
          "tradycyjne",
          "słodkie",
          "z owocami",
          "pieczone",
          "domowe",
        ],
        status: "active",
      },
      {
        id: "-QwoQJvH9TsL2zOiYp9Nc",
        order: 2,
        name: "Pączek z różą",
        price: 12,
        magnitude: "100g",
        calories: 250,
        ingredients: ["mąka", "cukier", "róża", "drożdże"],
        allergens: ["gluten"],
        attributes: ["tradycyjne", "słodkie", "z owocami", "smażone"],
        status: "active",
      },
    ],
  },
];

export const categoriesListState = atom<MenuCategory[]>({
  key: "CategoriesList",
  default: menuCategories,
});

const itemsListFilterState = atom({
  key: "ItemsListFilter",
  default: "All",
});

export const filteredCategoriesListState = selectorFamily<
  MenuCategory[],
  Space
>({
  key: "FilteredCategoriesList",
  get:
    (space: Space) =>
    ({ get }) => {
      const list = get(categoriesListState);

      switch (space) {
        case "listing":
          return list.filter(
            (category) =>
              category.status === "active" &&
              category.items?.filter((item) => item.status === "active") &&
              category.items?.filter((item) => item.status === "active")
                .length > 0,
          );
        default:
          return list;
      }
    },
});

export const itemsListState = selectorFamily<MenuItem[], string>({
  key: "Items",
  get:
    (categoryId: string) =>
    ({ get }) => {
      const categories = get(categoriesListState);
      const category = categories.find(
        (category: MenuCategory) => category.id === categoryId,
      );

      return category?.items?.slice().sort((a, b) => a.order - b.order) || [];
    },
  set:
    (categoryId: string) =>
    ({ set }, newItems) => {
      set(categoriesListState, (oldCategories) =>
        oldCategories.map((category) =>
          category.id === categoryId
            ? { ...category, items: newItems as MenuItem[] }
            : category,
        ),
      );
    },
});

export const filteredItemsListState = selectorFamily<MenuItem[], string>({
  key: "FilteredItemsList",
  get:
    (categoryId: string) =>
    ({ get }) => {
      const items = get(itemsListState(categoryId));
      const filter = get(itemsListFilterState);

      switch (filter) {
        case "All":
          return items;
        case "Active":
          return items.filter((item) => item.status === "active");
        default:
          return items;
      }
    },
});

export const nextCategoryOrderState = selector<number>({
  key: "NextOrderCategory",
  get: ({ get }) => {
    const categories = get(categoriesListState);
    if (categories.length === 0) return 1;

    return Math.max(...categories.map((category) => category.order)) + 1;
  },
});

export const itemDetailsState = selectorFamily<string[] | [], ItemDetails>({
  key: "ItemDetails",
  get:
    (detailsType: ItemDetails) =>
    ({ get }) => {
      const categories = get(categoriesListState);

      const details = categories
        .map((category) => category.items?.map((item) => item[detailsType]))
        .flat()
        .filter(
          (ingredient): ingredient is string[] => ingredient !== undefined,
        )
        .flat();

      return Array.from(new Set(details));
    },
});

export const nextItemOrderState = selectorFamily<number, string>({
  key: "NextItemOrder",
  get:
    (categoryId: string) =>
    ({ get }) => {
      const items = get(itemsListState(categoryId));
      if (!items || items.length === 0) return 1;

      return Math.max(...items.map((item) => item.order)) + 1;
    },
});

export const useAddCategory = () =>
  useRecoilCallback(({ set }) => (category: MenuCategory) => {
    set(categoriesListState, (oldCategories) => [...oldCategories, category]);
  });

export const useUpdateCategory = () =>
  useRecoilCallback(({ set }) => (category: MenuCategory) => {
    set(categoriesListState, (oldCategories: MenuCategory[]) =>
      oldCategories.map((oldCategory) =>
        oldCategory.id === category.id ? category : oldCategory,
      ),
    );
  });

export const useDeleteCategory = () =>
  useRecoilCallback(({ set }) => (categoryId: string) => {
    set(categoriesListState, (oldCategories: MenuCategory[]) =>
      oldCategories.filter((oldCategory) => oldCategory.id !== categoryId),
    );
  });

export const useAddItem = () =>
  useRecoilCallback(({ set }) => (categoryId: string, item: MenuItem) => {
    set(itemsListState(categoryId), (oldItems) => [...oldItems, item]);
  });

export const useUpdateItem = () =>
  useRecoilCallback(({ set }) => (categoryId: string, item: MenuItem) => {
    set(itemsListState(categoryId), (oldItems) =>
      oldItems.map((oldItem) => (oldItem.id === item.id ? item : oldItem)),
    );
  });

export const useDeleteItem = () =>
  useRecoilCallback(({ set }) => (categoryId: string, itemId: string) => {
    set(itemsListState(categoryId), (oldItems) =>
      oldItems.filter((item) => item.id !== itemId),
    );
  });

export const useReorderItems = () =>
  useRecoilCallback(({ set }) => (categoryId: string, items: MenuItem[]) => {
    set(itemsListState(categoryId), items);
  });
