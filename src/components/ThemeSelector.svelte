<script lang="ts">
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import IconPalette from "./icons/IconPalette.svelte";
  import IconCheck from "./icons/IconCheck.svelte";

  let currentTheme = localStorage.getItem("theme");
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  onMount(() => {
    themeChange(false);
  });

  function onThemeSelected(theme: string) {
    currentTheme = theme;
    document.activeElement.blur();
  }
</script>

<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn btn-ghost m-1 text-base-content">
    <IconPalette />
  </label>
  <div
    tabindex="0"
    class="dropdown-content menu bg-base-100 z-[1] text-base-content top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow mt-16"
  >
    <div class="grid grid-cols-1 gap-3 p-3 z-50" tabindex="0">
      {#each themes as theme}
        <button
          class="outline-base-content overflow-hidden rounded-lg text-left"
          data-set-theme={theme}
          data-act-class="[&amp;_svg]:visible"
          on:click={() => onThemeSelected(theme)}
        >
          <div
            data-theme={theme}
            class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
          >
            <div class="grid grid-cols-5 grid-rows-3">
              <div
                class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
              >
                <IconCheck
                  class="h-3 w-3 shrink-0 {theme !== currentTheme
                    ? 'hidden'
                    : ''}"
                />
                <div class="flex-grow text-sm">{theme}</div>
                <div
                  class="flex h-full flex-shrink-0 flex-wrap gap-1"
                  data-svelte-h="svelte-izuv7l"
                >
                  <div class="bg-primary w-2 rounded" />
                  <div class="bg-secondary w-2 rounded" />
                  <div class="bg-accent w-2 rounded" />
                  <div class="bg-neutral w-2 rounded" />
                </div>
              </div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
