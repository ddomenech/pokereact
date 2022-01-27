import React from "react";

function Pokemon({ pokemon }) {
    return (
        <tr><a href={pokemon.id}>
            <td><img src={pokemon.sprites.front_default} alt="" /></td>
            <td>{pokemon.name}</td></a>
        </tr>
    )
}

export default Pokemon;