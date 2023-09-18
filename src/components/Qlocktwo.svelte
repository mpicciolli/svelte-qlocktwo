<script lang="ts">
  import QlocktwoFace from "./QlocktwoFace.svelte";
  import { qlocktwoFace } from "../stores/qlocktwo.store";
</script>

<div
  class="rounded overflow-hidden shadow-xl p-8 sm:p-14 md:p-16 lg:p-24 bg-gradiant-p-to-sf"
>
  <QlocktwoFace config={$qlocktwoFace} />
</div>

<style scoped>
  .bg-gradiant-p-to-pf {
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--pf)));
  }

  .bg-gradiant-p-to-sf {
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--sf)));
  }
</style>
