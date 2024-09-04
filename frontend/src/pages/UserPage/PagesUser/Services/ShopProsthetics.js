import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContent } from "../Services";

function ShopProsthetics({ ProstheticsDB }) {
  const [arrayShow, setArrayShow] = useState([]);
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({});
  const { setCountCart,countCart,id} = useContext(GlobalContent);

  const increase = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 1) + 1,
    }));
  };

  const decrease = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max(1, (prevCounts[productId] || 1) - 1),
    }));
  };

  const addToCart = async (productId) => {
    try {
      setCountCart((prevCount) => prevCount + 1)
      const I = data.find((item) => item._id === productId);
      const res = await axios.post(`http://127.0.0.1:8080/Client/CartAdd/${id}`, {
        title: I.title,
        description: I.description,
        cost: I.cost,
        url:I.url,
        count: counts[productId]||1
      });
      alert(`The product ${I.title} has been added`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${ProstheticsDB}`);
      setData(res.data);

      const Transfemoral = res.data.filter(
        (e) => e.prosthetics === "Transfemoral"
      );
      const Transhumeral = res.data.filter(
        (e) => e.prosthetics === "Transhumeral"
      );
      const Transradial = res.data.filter(
        (e) => e.prosthetics === "Transradial"
      );
      const Transtibial = res.data.filter(
        (e) => e.prosthetics === "Transtibial"
      );

      setArrayShow([
        ["Transfemoral", Transfemoral],
        ["Transhumeral", Transhumeral],
        ["Transradial", Transradial],
        ["Transtibial", Transtibial],
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ProstheticsDB]); 
  return (
    <div>
      {arrayShow.map(([groupName, items], index) => (
        <div key={index} id="categorize">
          <hr />
          <div>{groupName}</div>
          <hr />
          <div id="prostheticsControl">
            {items.map((item) => (
              <div id="prosthetics" key={item._id}>
                <img id="prostheticsImg" src={item.url} alt={item.title} />
                <h3>{item.title}</h3>
                <div>{item.description}</div>
                <div id="cost">
                  <h3
                    style={{ fontSize: 30, cursor: "pointer" }}
                    onClick={() => increase(item._id)}
                  >
                    +
                  </h3>
                  <h3>{counts[item._id] || 1}</h3>
                  <h3
                    style={{ fontSize: 30, cursor: "pointer" }}
                    onClick={() => decrease(item._id)}
                  >
                    -
                  </h3>
                  <h3 style={{ fontSize: 20, textAlign: "right" }}>
                    ${counts[item._id] === undefined
                      ? item.cost
                      : item.cost * counts[item._id]}
                  </h3>
                </div>
                <div
                  id="addCart"
                  onClick={() => addToCart(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  Add to Cart
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShopProsthetics;
