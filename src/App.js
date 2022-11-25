import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const API = "https://craterapi.com/api/package/search";

  const resOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msisdn: "" }),
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API, resOptions);
      const data = await res.json();

      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <ol>
        {products.map((product) => (
          <li key={product.id}>{product.ticker}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
