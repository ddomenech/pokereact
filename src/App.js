import "./App.css";
import { Routes, Route } from "react-router-dom";
import Pokemons from "./Pokemons";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
