import { useEffect } from "react";
import { useNotContext } from "../hooks/useNotContext";

import NotDetay from "../components/NotDetay";
import NotForm from "../components/NotForm";

import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { notlar, dispatch } = useNotContext();

  const { kullanici } = useAuthContext();

  useEffect(() => {
    const fetchNotlar = async () => {
      if (!kullanici || !kullanici.token) {
        console.log("Kullanıcı doğrulaması yapılmamış.");
        return;
      }

      const response = await fetch("http://localhost:4000/api/notlar", {
        headers: {
          Authorization: `Bearer ${kullanici.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log("Hata:", json);
      } else {
        dispatch({ type: "NOT_DOLDUR", payload: json });
      }
    };

    if (kullanici) {
      fetchNotlar();
    }
  }, [dispatch, kullanici]);

  return (
    <div className="home">
      <div className="not-form">
        <NotForm />
      </div>
      <hr />

      <div className="notlar">
        {notlar && notlar.map((not) => <NotDetay key={not._id} not={not} />)}
      </div>
    </div>
  );
};

export default Home;
