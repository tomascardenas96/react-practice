function useModifyFoodAmount() {
  const token = localStorage.getItem("token");

  const handleModifyAmount = async (id, operation) => {
    const response = await fetch(
      `http://localhost:3070/api/v1/food-on-cart/modifyamount/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operation }),
      }
    );
    const parsedResponse = await response.json();
  };

  return { handleModifyAmount };
}

export default useModifyFoodAmount;
