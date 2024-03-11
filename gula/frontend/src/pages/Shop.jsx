import useFood from "../hooks/useFood";
import useShop from "../hooks/useShop";
import "./Shop.css";

function Shop() {
  const { shop } = useShop();
  const { menu, loading, error } = useFood(shop.profileName);

  return (
    <>
      <h1>{shop.name}</h1>
      {!error ? menu.map((food) => (
        <p key={food.foodId}>{food.description}</p>
      )): <p>No hay comida aun</p>}
    </>
  );
}

export default Shop;
