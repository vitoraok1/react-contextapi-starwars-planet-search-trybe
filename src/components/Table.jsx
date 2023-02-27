import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

export default function Table() {
  const { planets } = useContext(StarWarsContext);
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index1) => (
            <tr key={ index1 }>
              <td>
                { planet.name }
              </td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>
                {planet.films.map((url, index2) => (
                  <span key={ index2 }>
                    <a href={ url }>{ url }</a>
                  </span>
                ))}
              </td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>
                <a href={ planet.url }>{ planet.url }</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
