<template>
  <g>
    <g transform="translate(400, 300)">
      <g v-for="(key) in Object.keys(layout.graph.nodes)"
        :key=key
        :transform="`translate(${layout.graph.nodes[key].layoutPosX*40}, ${layout.graph.nodes[key].layoutPosY*30})`" >
        <circle r=3 fill="black"></circle>
        <text y=15>
          {{key}}
        </text>
      </g>
      <g v-for="edge in layout.graph.edges" :key="`${edge.source.id}-${edge.target.id}`"
        :transform="`translate(${(edge.source.layoutPosX+edge.target.layoutPosX)/2*40}, ${(edge.source.layoutPosY+edge.target.layoutPosY)/2*30})`">
        <text>{{edge.attraction*4 - 1}}</text>
      </g>
    </g>
  </g>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, InjectReactive } from "vue-property-decorator";
import { Layout, Graph } from "graphdracula";
import { Engine } from '@boardgamers/powergrid';

@Component
export default class CityMap extends Vue {
  @InjectReactive()
  G!: Engine;

  get layout () {
    if (!this.G?.board?.map) {
      console.log("no map");
      return [];
    }
    console.log("map!", this.G.board.map.links);
    const graph = new Graph();

    for (const link of this.G.board.map.links) {
      console.log("adding edge", link.nodes[0], link.nodes[1]);
      graph.addEdge(link.nodes[0], link.nodes[1]).attraction = (link.cost + 1) / 4;
    }

    const l = new Layout.Spring(graph);

    console.log(l);

    return l;
  }
}

</script>
