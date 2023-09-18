<script lang="ts">
  import dayjs from "dayjs";
  import { onDestroy, onMount } from "svelte";
  import ClockFace from "./ClockFace.svelte";
  import { qlockTwoConfig } from "../stores/qlocktwo.store";

  let timer: any = null;
  let clockface: { letter: string; isHighlighted: boolean }[][] = [];

  onMount(() => {
    qlockTwoConfig.subscribe(() => {
      startClock();
    });
  });

  onDestroy(() => {
    clearTimeout(timer);
  });

  function initClock() {
    clockface = $qlockTwoConfig.clockFace.map((row) => {
      return row.map((v) => {
        return { letter: v, isHighlighted: false };
      });
    });
  }

  function startClock() {
    initClock();
    refreshBoard();
  }

  function getMinuteRounded(minute: number): number {
    return Math.round(minute / 5) * 5;
  }

  function refreshBoard(): void {
    const date = dayjs();
    let hour = date.format("h");
    let minute = getMinuteRounded(date.minute());
    const s = $qlockTwoConfig.sentences.default;
    const h = $qlockTwoConfig.sentences.hours[hour];
    const m = $qlockTwoConfig.sentences.minutes[minute];

    clockface = clockface.map((rows, i) => {
      return rows.map((row, j) => {
        row.isHighlighted =
          [...s, h, ...m].findIndex((v) => {
            return v[0] == i && j >= v[1] && j <= v[2];
          }) > -1;
        return row;
      });
    });

    resetTimer();
  }

  function getNextResfresh(): number {
    const date = dayjs();

    return dayjs()
      .minute(getMinuteRounded(date.minute()) + 5)
      .second(0)
      .millisecond(0)
      .diff(date);
  }

  function resetTimer() {
    clearTimeout(timer);

    timer = setTimeout(() => {
      refreshBoard();
    }, getNextResfresh());
  }
</script>

<div
  class="rounded overflow-hidden shadow-xl p-8 sm:p-14 md:p-16 lg:p-24 bg-gradiant-p-to-sf"
>
  <ClockFace config={clockface} />
</div>

<style scoped>
  .bg-gradiant-p-to-pf {
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--pf)));
  }

  .bg-gradiant-p-to-sf {
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--sf)));
  }
</style>
