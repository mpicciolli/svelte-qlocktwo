<script lang="ts">
  import { lang } from "../stores/app.store";
  import IconLanguage from "./icons/IconLanguage.svelte";
  import IconPalette from "./icons/IconPalette.svelte";

  const languages = [
    { iso: "en", label: "English" },
    { iso: "fr", label: "Français" },
  ];
  $: currentLang = $lang;

  function onLangSelected(value: { iso: string; label: string }) {
    lang.set(value.iso);
    document.activeElement.blur();
  }
</script>

<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn btn-ghost m-1 text-base-content">
    <IconLanguage />
  </label>
  <ul
    tabindex="0"
    class="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 w-52 mt-16 top-px"
  >
    {#each languages as lang}
      <li>
        <button
          class=""
          on:click={() => onLangSelected(lang)}
          class:active={currentLang === lang.iso}
        >
          <span
            class="badge badge-sm badge-outline font-mono !text-[.6rem] pt-px opacity-50 font-bold tracking-widest !pr-1 !pl-1.5"
          >
            {lang.iso}
          </span>
          {lang.label}
        </button>
      </li>
    {/each}
  </ul>
</div>
