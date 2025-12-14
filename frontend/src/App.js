// import { useEffect, useState } from "react";

// function App() {
//   const [sweets, setSweets] = useState([]);
//   const [search, setSearch] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState(10);

//   // DEMO ROLE SWITCH
//   const [isAdmin, setIsAdmin] = useState(true);

//   const fetchSweets = async () => {
//     const res = await fetch("http://localhost:5100/api/sweets");
//     const data = await res.json();
//     setSweets(data);
//   };

//   useEffect(() => {
//     fetchSweets();
//   }, []);

//   const addSweet = async () => {
//     await fetch("http://localhost:5100/api/sweets", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, price, quantity }),
//     });
//     setName("");
//     setPrice("");
//     setQuantity(10);
//     fetchSweets();
//   };

//   const deleteSweet = async (id) => {
//     await fetch(`http://localhost:5100/api/sweets/${id}`, {
//       method: "DELETE",
//     });
//     fetchSweets();
//   };

//   const purchaseSweet = async (id) => {
//     await fetch(`http://localhost:5100/api/sweets/${id}/purchase`, {
//       method: "POST",
//     });
//     fetchSweets();
//   };

//   const filteredSweets = sweets.filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={{ padding: 20, maxWidth: 600 }}>
//       <h2>Sweet Shop Management</h2>

//       {/* DEMO ROLE */}
//       <label>
//         <input
//           type="checkbox"
//           checked={isAdmin}
//           onChange={() => setIsAdmin(!isAdmin)}
//         />
//         Admin Mode
//       </label>

//       {isAdmin && (
//         <>
//           <h4>Add Sweet (Admin)</h4>
//           <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//           <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
//           <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
//           <button onClick={addSweet}>Add</button>
//           <hr />
//         </>
//       )}

//       <input
//         placeholder="Search sweets..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <h4>Available Sweets</h4>

//       {filteredSweets.map((s) => (
//         <div key={s._id} style={{ marginBottom: 10 }}>
//           <b>{s.name}</b> – ₹{s.price} | Stock: {s.quantity}

//           <button
//             disabled={s.quantity === 0}
//             onClick={() => purchaseSweet(s._id)}
//             style={{ marginLeft: 10 }}
//           >
//             Purchase
//           </button>

//           {isAdmin && (
//             <button onClick={() => deleteSweet(s._id)} style={{ marginLeft: 10 }}>
//               Delete
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;





import { useEffect, useState } from "react";

function App() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  // Auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  // Sweet form (admin)
  const [sweetName, setSweetName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(10);

  const fetchSweets = async () => {
    const res = await fetch("http://localhost:5100/api/sweets");
    const data = await res.json();
    setSweets(data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // REGISTER
  const register = async () => {
    await fetch("http://localhost:5100/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    alert("Registered successfully. Please login.");
  };

  // LOGIN
  const login = async () => {
    const res = await fetch("http://localhost:5100/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    setToken(data.token);
    setUserRole(data.role);
    alert("Logged in");
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserRole(null);
  };

  // ADD SWEET (ADMIN)
  const addSweet = async () => {
    await fetch("http://localhost:5100/api/sweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: sweetName,
        price,
        quantity,
      }),
    });
    setSweetName("");
    setPrice("");
    setQuantity(10);
    fetchSweets();
  };

  // DELETE SWEET (ADMIN)
  const deleteSweet = async (id) => {
    await fetch(`http://localhost:5100/api/sweets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchSweets();
  };

  // PURCHASE SWEET (USER)
  const purchaseSweet = async (id) => {
    await fetch(`http://localhost:5100/api/sweets/${id}/purchase`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchSweets();
  };

  const filteredSweets = sweets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>Sweet Shop Management</h2>

      {!token ? (
        <>
          <h4>Register</h4>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={register}>Register</button>

          <hr />

          <h4>Login</h4>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <p>
            Logged in as <b>{userRole}</b>
          </p>
          <button onClick={logout}>Logout</button>
        </>
      )}

      <hr />

      {userRole === "admin" && (
        <>
          <h4>Add Sweet (Admin)</h4>
          <input
            placeholder="Sweet Name"
            value={sweetName}
            onChange={(e) => setSweetName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={addSweet}>Add Sweet</button>
          <hr />
        </>
      )}

      <input
        placeholder="Search sweets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h4>Available Sweets</h4>

      {filteredSweets.map((s) => (
        <div key={s._id} style={{ marginBottom: 10 }}>
          <b>{s.name}</b> – ₹{s.price} | Stock: {s.quantity}

          {token && (
            <button
              disabled={s.quantity === 0}
              onClick={() => purchaseSweet(s._id)}
              style={{ marginLeft: 10 }}
            >
              Purchase
            </button>
          )}

          {userRole === "admin" && (
            <button
              onClick={() => deleteSweet(s._id)}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
