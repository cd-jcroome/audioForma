import { forceSimulation, forceCollide, forceY, forceX } from "d3-force";
import { scaleLinear } from "d3-scale";

export const simulation = async tracks => {
  const width = window.innerWidth * 0.75;
  const height = window.innerHeight * 0.9;
  const items = tracks;

  const xScale = scaleLinear()
    .domain([0, 1])
    .range([0, width * 3]);
  const yScale = scaleLinear()
    .domain([1, 0])
    .range([height, 0]);

  const move = forceSimulation()
    .force(
      "x",
      forceX(d => {
        return xScale(d["valence"]);
      }).strength(0.05)
    )
    .force(
      "y",
      forceY(d => {
        return yScale(0.5);
      }).strength(0.05)
    )
    .force(
      "collide",
      forceCollide(d => {
        return 25;
      }).iterations(5)
    );
  move.nodes(items);

  return items;
};
