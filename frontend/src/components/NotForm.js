import { useState } from "react";

import { useNotContext } from "../hooks/useNotContext";

import { useAuthContext } from "../hooks/useAuthContext";

const NotForm = () => {
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();

  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [hata, setHata] = useState(null);
  const [bosAlanlar, setBosAlanlar] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kullanici) {
      setHata("Giriş yapmalısınız");
      return;
    }

    const not = { baslik, aciklama };

    const response = await fetch("http://localhost:4000/api/notlar", {
      method: "POST",
      body: JSON.stringify(not),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${kullanici.token}`,
      },
    });

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setHata(json.hata);
      setBosAlanlar(Array.isArray(json.bosAlanlar) ? json.bosAlanlar : []);
    }

    if (response.ok) {
      setHata(null);
      setBaslik("");
      setAciklama("");
      setBosAlanlar([]);
      dispatch({ type: "NOT_OLUSTUR", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a Note</h3>
      <div className="create-group">
        <div>
          <label>Title:</label>
          <input
            className={bosAlanlar.includes("baslik") ? "error" : ""}
            type="text"
            onChange={(e) => setBaslik(e.target.value)}
            value={baslik}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            onChange={(e) => setAciklama(e.target.value)}
            value={aciklama}
          />
        </div>
      </div>
      <button type="submit">ADD</button>
      {hata && <div className="error">{hata}</div>}
    </form>
  );
};

export default NotForm;
