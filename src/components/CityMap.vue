<template>
  <g>
    {{layout}}
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
      graph.addEdge(link.nodes[0], link.nodes[1]);
    }

    const l = new Layout.Spring(graph);

    return l;
  }
}

</script>
