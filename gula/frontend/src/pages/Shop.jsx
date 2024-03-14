import useFood from "../hooks/useFood";
import useShop from "../hooks/useShop";
import NewPost from "../components/NewPost"
import "./Shop.css";

function Shop() {
  const { shop } = useShop();
  const {
    menu,
    loading,
    error,
    handleChangeString,
    handleChangeNumber,
    handleSubmit,
    newFood,
    isShopOwner
  } = useFood(shop);

  return (
    <>
      <h1>{shop.name}</h1>
      {isShopOwner && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">
            Descripcion:
            <input
              name="description"
              type="text"
              onChange={handleChangeString}
              value={newFood.description}
            />
          </label>
          <label htmlFor="price">
            Precio:
            <input
              name="price"
              type="number"
              onChange={handleChangeNumber}
              value={newFood.price}
            />
          </label>
          <label htmlFor="stock">
            Stock:
            <input
              name="stock"
              type="number"
              onChange={handleChangeNumber}
              value={newFood.stock}
            />
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              name="category"
              onChange={handleChangeString}
              value={newFood.category}
            >
              <option value="Carnes">Carnes</option>
              <option value="Hamburguesas">Hamburguesas</option>
              <option value="Panchos">Panchos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Helados">Helados</option>
              <option value="Cervezas">Cervezas</option>
              <option value="Papas fritas">Papas fritas</option>
              <option value="Pastas">Pastas</option>
              <option value="Pizzas">Pizzas</option>
            </select>
          </label>
          <input type="submit" value="Publicar" />
        </form>
      )}

      {!error ? (
        menu.map((food) => <p key={food.foodId}>{food.description}</p>)
      ) : (
        <p>No hay comida aun</p>
      )}
      <NewPost />
    </>
  );
}

export default Shop;
