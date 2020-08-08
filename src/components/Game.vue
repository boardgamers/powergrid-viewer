<template>
  <div>
    {{player}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Engine } from '@boardgamers/powergrid';

@Component
export default class Game extends Vue {
  @Prop() state!: Engine;
  @Prop() player!: number;

  @Watch('state', { immediate: true })
  onStateChanged () {
    console.log('state', !!this.state);
  }
}
</script>
