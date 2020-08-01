<template>
  <div>
    {{player}} x {{state}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Engine } from '@boardgamers/powergrid';

@Component
export default class Game extends Vue {
  @Prop() state!: Engine;
  @Prop() player!: number;
}
</script>
