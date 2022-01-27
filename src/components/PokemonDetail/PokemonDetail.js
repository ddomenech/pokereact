import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemon } from "../../services/pokemon";
import "./style.css";

function PokemonDetail() {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const initialURL = "https://pokeapi.co/api/v2/pokemon";
    let { id } = useParams();
    const detail = { "url": `${initialURL}/${id}/` };
    console.log(detail);
    console.log(loading);

    useEffect(() => {
        async function fetchData() {
            let data = await getPokemon(detail);
            setPokemon(data);
            setLoading(false);
        }
        fetchData();

    }, {});
    
    

    return (
        <div className="grid-container">
        {loading ? <h1 style={{ textAlign: "center" }}>Loading...</h1> : (
            <div class="per-card-2">
                <div class="card-image">
                    <ul>
                        <img src={pokemon.sprites.front_default} alt="" />
                        <li>
                            <p>{pokemon.name}</p>
                        </li>
                    </ul>                          
                </div>
                <div class="card-content">
                    <div class="card-text">
                        <h3>Abilities</h3>
                        <ul>
                        {pokemon.abilities.map((ability, i) => {
                        return <li class="fa fa-ok" key={i} title={ability.ability.name}>{ability.ability.name}</li>
                    })}
                        </ul>
                    </div>

                </div>
                <div class="btn">
                    <button><Link to="/">Volver</Link></button>
                </div>
            </div>
        )}
        </div>
    )
}

export default PokemonDetail;