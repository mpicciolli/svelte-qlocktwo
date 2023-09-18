<script lang="ts">
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";

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
  <label tabindex="0" class="btn normal-case btn-ghost m-1 text-base-content">
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-5 w-5 stroke-current"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      /></svg
    >
  </label>
  <div
    tabindex="0"
    class="dropdown-content menu bg-base-100 z-[1] text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow mt-16"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-3 w-3 shrink-0"
                  class:hidden={theme !== currentTheme}
                  ><path
                    d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                  />
                </svg>
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
