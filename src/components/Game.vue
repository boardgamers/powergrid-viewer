<template>
  <div>
    <svg width=800 height=600 style="border: 1px black">
      <TurnOrder transform="translate(20, 20)" />
      <CityMap tranform="translate(20, 50)" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, ProvideReactive } from 'vue-property-decorator';
import { Engine } from '@boardgamers/powergrid';
import TurnOrder from "./TurnOrder.vue";
import CityMap from "./CityMap.vue";

@Component({
  components: {
    CityMap,
    TurnOrder
  }
})
export default class Game extends Vue {
  @Prop() state!: Engine;
  @Prop() player!: number;

  @ProvideReactive()
  G: Engine = new Engine();

  @Watch('state', { immediate: true })
  onStateChanged () {
    if (this.state) {
      const data = JSON.parse(JSON.stringify(this.state));
      const engine = new Engine();
      engine.fromJSON(data);
      this.G = engine;
    }
  }
}
</script>
<style lang="scss">
text {
  font-family: 'Arial';
  pointer-events: none;
  text-anchor: middle;
  dominant-baseline: central;
}
</style>
