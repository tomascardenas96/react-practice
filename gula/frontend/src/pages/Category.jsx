import React from "react";
import "./Category.css";
import useGetFoodByCategory from "../hooks/useGetFoodByCategory";
import Header from "../components/Header";

function Category() {
  const { food } = useGetFoodByCategory();

  console.log(food);

  return (
    <>
      <Header />
      {food.map((f, idx) => (
        <p key={idx}>{f.description}</p>
      ))}
    </>
  );
}

export default Category;
