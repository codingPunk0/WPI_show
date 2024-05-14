import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { EachMnemonic } from "./eachMnemonic";

const App = () => {
  const [mnemonics, setMnemonics] = useState([]);
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState("");
  const serverURL = import.meta.env.VITE_SERVER_URL
  const token = import.meta.env.VITE_TOKEN

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const form = new FormData(e.target);
    try {
      const res = await fetch(`${serverURL}/api/displayMnemonics?token=${token}`, {
        method: "POST",
        body: JSON.stringify({ password: form.get("password") }),
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();

      if (response.success) {
        setMnemonics(response.mnemonics);
        setVerified(true);
        setShowLoader(false);
      }

      if (response.wrongPassword) {
        setError("Wrong password");
        setShowLoader(false);
      }

      if (response.error) {
        setError("There was an error, please try again");
        setShowLoader(false);
      }
    } catch (e) {
      setError("There was an error, please try again");
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-black">
        <Oval />
      </main>
    );
  }

  if (verified)
    return (
      <section className="px-3 pb-3 bg-black text-white h-screen overflow-scroll">
        {mnemonics.map((item, i) => (
          <EachMnemonic
            mnemonic={item.mnemonic}
            key={i}
          />
        ))}
      </section>
    );

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <form
        onSubmit={submitHandler}
        className="border rounded-xl flex flex-col p-10 md:w-[50%] lg:w-[30%]">
        <input
          className="border outline-none h-[3rem] p-1 bg-transparent"
          placeholder="enter password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          value="submit"
          className="p-3 rounded-xl bg-blue-400 mt-5">
          Submit
        </button>
      </form>
      {error && <p className="w-fit mx-auto mt-5 text-red-500">{error}</p>}
    </main>
  );
};


export default App