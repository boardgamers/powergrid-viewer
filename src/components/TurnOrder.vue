<template>
  <g v-if="turnOrder">
    <circle v-for="(x,i) in turnOrder" :fill=x r=10 :cx="i*25" :stroke-width="x === G.currentPlayer ? 3 : 0" stroke=black :key=x />
    {{G.currentPlayer}}
  </g>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, InjectReactive } from "vue-property-decorator";
import { Engine } from '@boardgamers/powergrid';

@Component({
  created () {
    console.log("G turnorder", this.G.turnorder);
  }
})
export default class TurnOrder extends Vue {
  @InjectReactive()
  G!: Engine;

  get turnOrder () {
    return this.G.turnorder;
  }
}

</script>
