import { useState, useEffect } from "react";
import { Product, Carrier, Plan } from "./Product";

import _ from "lodash";

function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(true);

  const API = "https://craterapi.com/api/package/search";
  const baseUrl = "https://craterapi.com/";

  const resOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msisdn: "" }),
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API, resOptions);
      const data = await res.json();

      console.log(data);
      setProducts(data);
    };

    fetchData();
  }, [filter, order]);

  return (
    <div className="App">
      <h4>Sort By:</h4>
      <select
        defaultValue={"DEFAULT"}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value={""}>Filter by Region</option>
        <option value={"country_code"}>Country Name</option>
        <option value={"name"}>Carrier Name</option>
        <option value={"size"}>Plan Size</option>
        <option value={"id"}>ID</option>
      </select>

      <span>Ascending?</span>
      <input onClick={() => setOrder(!order)} checked={order} type="checkbox" />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan Expiry</th>
            <th>Plan Size</th>
            <th>Plan Unit</th>
            <th>Carrier Name</th>
            <th>Carrier Image</th>
            <th>Country Name</th>
            <th>Link to Terms & Conditions</th>
          </tr>
        </thead>
        {_.orderBy(products, [filter], [order]).map(
          ({ id, plan, carrier }: Product) => (
            <tbody key={id}>
              <tr>
                <td>{id}</td>
                <td>{plan.expiry_type}</td>
                <td>{plan.size}</td>
                <td>{plan.unit}</td>
                <td>{carrier.name}</td>
                <td>
                  <img
                    src={baseUrl + carrier.imageUrl}
                    alt=""
                    width={80}
                    height={40}
                  />
                </td>
                <td>{carrier.country_code}</td>
                <td>
                  <a
                    href={plan.tnc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.tnc_url ? "Terms & Conditions" : "Not available"}
                  </a>
                </td>
              </tr>
            </tbody>
          )
        )}
      </table>
    </div>
  );
}

export default App;
