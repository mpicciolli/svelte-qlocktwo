<script lang="ts">
  import Qlocktwo from "./components/Qlocktwo.svelte";
  import ThemeSelector from "./components/ThemeSelector.svelte";
  import LangSelector from "./components/LangSelector.svelte";
</script>

<main class="base-100 px-2">
  <div class="flex justify-end">
    <ThemeSelector />
    <LangSelector />
  </div>
  <Qlocktwo />
</main>
