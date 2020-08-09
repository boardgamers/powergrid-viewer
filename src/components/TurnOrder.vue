<template>
  <g v-if="turnOrder">
    <circle v-for="(x,i) in turnOrder" :fill=x r=12 :cx="i*30" :stroke-width="x === G.currentPlayer ? 2 : 0" stroke=cyan :key=x />
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
