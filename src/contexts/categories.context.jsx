import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
  handleSelectedCategory: () => {},
  getCategoriesProducts: () => {},
});

export const getCategoryProducts = (categoriesMap, title) => {
  if (!title) return;
  return categoriesMap[title].map((product) => product);
};

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };
    getCategoriesMap();
  }, []);

  useEffect(() => {
    if (categoriesMap) {
      const products = getCategoryProducts(categoriesMap, selectedCategory);
      setCategoryProducts(products);
    }
  }, [selectedCategory, categoriesMap]);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const value = {
    categoriesMap,
    handleSelectedCategory,
    selectedCategory,
    categoryProducts,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
