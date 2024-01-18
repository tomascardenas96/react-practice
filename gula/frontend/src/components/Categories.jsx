import CategoryCard from "./CategoryCard";
import Spinner from "./Spinner";
import "./styles/Categories.css";

import React, { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("http://localhost:3070/api/v1/category")
        .then((response) => {
          if (!response.ok) {
            setError(true);
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data);
          setLoading(false);
        });
    } catch (error) {
      setError(true);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="categories-food__container">
      <section>
        <h1>Categorias</h1>
        <div>
          {categories.map((categ, index) => (
            <CategoryCard
              className="unit-category"
              key={index}
              icon={categ.icon}
              categoryName={categ.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Categories;
