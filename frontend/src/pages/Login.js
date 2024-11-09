import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");

  const { login, hata, yukleniyor } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, parola);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" onChange={(e) => setParola(e.target.value)} />

      <button disabled={yukleniyor} type="submit">
        Enter
      </button>

      {hata && <div className="error">{hata}</div>}
    </form>
  );
};

export default Login;
