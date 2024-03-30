function useDeleteFoodOfCart() {
  const token = localStorage.getItem("token");

  const deleteFromCart = async (foodId) => {
    const response = await fetch(
      `http://localhost:3070/api/v1/food-on-cart/delete/${foodId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const parsedResponse = await response.json();
    return parsedResponse;
  };

  return { deleteFromCart };
}

export default useDeleteFoodOfCart;
