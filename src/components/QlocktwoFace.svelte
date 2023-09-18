<script lang="ts">
  export let config: { letter: string; isHighlighted: boolean }[][];
</script>

<div class="clockface grid grid-cols-11 gap-4">
  {#each config as rows, i}
    {#each rows as value, j}
      <span
        class="clockface__letter font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl text-center text-base-content"
        class:clockface__letter--highlighted={value.isHighlighted}
        class:text-white={value.isHighlighted}
        class:opacity-40={!value.isHighlighted}
        class:clockface__letter--engraved={!value.isHighlighted}
      >
        {value.letter}
      </span>
    {/each}
  {/each}
</div>

<style lang="scss" scoped>
  .clockface {
    font-family: Cako-Regular;

    &__letter {
      transition: text-shadow 0.5s ease;

      &--engraved {
        text-shadow: -1px -1px 1px hsl(var(--bc) / 0.4);
      }

      &--highlighted {
        text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #fff, 0 0 77px #fff,
          0 0 100px #fff;
      }
    }
  }
</style>
