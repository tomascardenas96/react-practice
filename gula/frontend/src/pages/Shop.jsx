import useFood from "../hooks/useFood";
import useShop from "../hooks/useShop";
import "./Shop.css";

function Shop() {
  const { shop } = useShop();
  const { menu, loading, error, handleChange, handleSubmit, newFood } = useFood(shop);
  

  return (
    <>
      <h1>{shop.name}</h1>
      <form>

      </form>
      {!error ? menu.map((food) => (
        <p key={food.foodId}>{food.description}</p>
      )): <p>No hay comida aun</p>}
    </>
  );
}

export default Shop;
