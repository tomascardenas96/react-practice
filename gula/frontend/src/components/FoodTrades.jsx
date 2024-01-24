import React from "react";
import "./styles/FoodTrades.css";
import FoodTradeCard from "./FoodTradeCard";

function FoodTrades() {
  return (
    <>
      <section className="food-trades__container">
        <div className="food-trades">
          <h1>Comercios adheridos</h1>
          <div>
            <FoodTradeCard image="https://media.istockphoto.com/id/1218963825/es/foto/encantadora-peque%C3%B1a-cafeter%C3%ADa-independiente.jpg?s=612x612&w=0&k=20&c=M4XtceMQrqDvtkYJwMNLUddFd83yMhSZI9S2K6bx7Hs=" title="Rotiseria Family" />
            <FoodTradeCard image="https://resizer.glanacion.com/resizer/v2/al-entrar-a-cacho-rotiseria-en-palermo-sorprenden-TMYPTF6U3BFRZMN4HY5BLDWZIU.jpg?auth=a643bedda25ad80caab7db3b1f01526fbec075a328d5debe8387daddd5a905fc&width=1920&height=1280&quality=70&smart=true" title="Rotiseria 'Pablo'" />
            <FoodTradeCard image="https://i.pinimg.com/550x/b9/23/76/b923761a03945e77083cb1d8889d35d2.jpg" title="Sabores al paso" />
            <FoodTradeCard image="https://www.baenegocios.com/__export/1657307620987/sites/cronica/img/2022/07/08/vinotinto_cocina.jpg_792575817.jpg" title="Rotiseria Clementina" />
            <FoodTradeCard image="https://www.elcaminodelacerveza.com/wp-content/uploads/2019/09/Alvarez-Palermo-2-650x500.jpg" title="Cerveceria 'Jooks'" />
          </div>
        </div>
      </section>
    </>
  );
}

export default FoodTrades;
