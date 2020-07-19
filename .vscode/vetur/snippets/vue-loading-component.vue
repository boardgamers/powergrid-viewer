<template>
  <v-loading :loading="loading">

  </v-loading>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { handleError } from '@/utils';

@Component({
  async created (this: $0) {
    try {

    } catch (err) {
      handleError(err);
    } finally {
      this.loading = false;
    }
  }
})
export default class $0 extends Vue {
  loading = true;
}

</script>
