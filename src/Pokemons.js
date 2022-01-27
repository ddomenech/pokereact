import React, { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";
import { getPokemon, getAllPokemon } from "./services/pokemon";
import "./App.css";

function Pokemons() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  return (
    <>
      <div className="Navbar">
            Pokemon API
        </div>
      <div>
        {loading ? <h1 style={{ textAlign: "center" }}>Loading...</h1> : (
          <>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            <div className="grid-container">
              <table>
                <thead>
                  <tr>
                    <td>Imagen</td>
                    <td>Nombre</td>
                  </tr>
                </thead>
                  <tbody>
                  {pokemonData.map((pokemon, i) => {
                    return <Pokemon key={i} pokemon={pokemon} />
                  })}
                  </tbody>
              </table>
            </div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pokemons;