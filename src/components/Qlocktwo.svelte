<script lang="ts">
  import dayjs from "dayjs";
  import { onDestroy, onMount } from "svelte";
  import type { ClockConfig } from "../models/ClockConfig";

  const matrix = [
    ["I", "T", "L", "I", "S", "B", "F", "A", "M", "P", "M"],
    ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "D", "C"],
    ["T", "W", "E", "N", "T", "Y", "F", "I", "V", "E", "X"],
    ["H", "A", "L", "F", "B", "T", "E", "N", "F", "T", "O"],
    ["P", "A", "S", "T", "E", "R", "U", "N", "I", "N", "E"],
    ["O", "N", "E", "S", "I", "X", "T", "H", "R", "E", "E"],
    ["F", "O", "U", "R", "F", "I", "V", "E", "T", "W", "O"],
    ["E", "I", "G", "H", "T", "E", "L", "E", "V", "E", "N"],
    ["S", "E", "V", "E", "N", "T", "W", "E", "L", "V", "E"],
    ["T", "E", "N", "S", "E", "O'", "C", "L", "O", "C", "K"],
  ];

  const config: ClockConfig = {
    sentences: {
      default: [
        [0, 0, 1], // IT
        [0, 3, 4], // IS
      ],
      hours: {
        0: [8, 5, 10],
        1: [5, 0, 2],
        2: [6, 8, 10],
        3: [5, 6, 10],
        4: [6, 0, 3],
        5: [6, 4, 7],
        6: [5, 3, 5],
        7: [8, 0, 4],
        8: [7, 0, 4],
        9: [4, 7, 10],
        10: [9, 0, 2],
        11: [7, 5, 10],
        12: [8, 5, 10],
      },
      minutes: {
        0: [[9, 5, 10]], //O'CLOCK
        5: [
          [2, 6, 9],
          [4, 0, 3],
        ],
        10: [
          [3, 5, 7],
          [4, 0, 3],
        ],
        15: [
          [1, 2, 8],
          [4, 0, 3],
        ],
        20: [
          [2, 0, 5],
          [4, 0, 3],
        ],
        25: [
          [2, 0, 9],
          [4, 0, 3],
        ],
        30: [
          [3, 0, 3],
          [4, 0, 3],
        ],
        35: [
          [2, 0, 9],
          [3, 9, 10],
        ],
        40: [
          [2, 0, 5],
          [3, 9, 10],
        ],
        45: [
          [1, 2, 8],
          [3, 9, 10],
        ],
        50: [
          [3, 5, 7],
          [3, 9, 10],
        ],
        55: [
          [2, 6, 9],
          [3, 9, 10],
        ],
        60: [[9, 5, 10]], //O'CLOCK
      },
    },
  };
  let interval: any = null;
  let clockface: { letter: string; isHighlighted: boolean }[][] = [];

  onMount(() => {
    initClock();
    startClock();
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  function initClock() {
    clockface = matrix.map((row) => {
      return row.map((v) => {
        return { letter: v, isHighlighted: false };
      });
    });
  }

  function startClock() {
    const initDate = dayjs();
    let hour = initDate.format("h");
    let minute = getMinuteRounded(initDate.minute());

    refreshBoard(hour.toString(), minute.toString());

    interval = setInterval(() => {
      const currentDate = dayjs();
      const currentHour = currentDate.format("h");
      const currentMinute = getMinuteRounded(currentDate.minute());

      if (currentHour !== hour || currentMinute !== minute) {
        hour = currentHour;
        minute = currentMinute;

        refreshBoard(hour, minute);
      }
    }, 1000);
  }

  function getMinuteRounded(minute: number): string {
    return (Math.round(minute / 5) * 5).toString();
  }

  function refreshBoard(hour: string, minute: string): void {
    const s = config.sentences.default;
    const h = config.sentences.hours[hour];
    const m = config.sentences.minutes[minute];

    clockface.map((rows, i) => {
      rows.map((row, j) => {
        row.isHighlighted =
          [...s, h, ...m].findIndex((v) => {
            return v[0] == i && j >= v[1] && j <= v[2];
          }) > -1;
      });
    });
  }
</script>

<div
  class="grid grid-cols-11 gap-4 rounded overflow-hidden shadow-xl p-8 sm:p-14 md:p-16 lg:p-24 bg-gradiant-p-to-sf"
>
  {#each clockface as rows, i}
    {#each rows as value, j}
      <span
        class="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl text-center"
        class:neon={value.isHighlighted}
        class:text-white={value.isHighlighted}
        class:opacity-70={!value.isHighlighted}
      >
        {value.letter}
      </span>
    {/each}
  {/each}
</div>

<style>
  .bg-gradiant-p-to-pf {
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--pf)));
  }

  .bg-gradiant-p-to-sf {
    background: linear-gradient(135deg, hsl(var(--p)), hsl(var(--sf)));
  }

  .neon {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #fff, 0 0 77px #fff,
      0 0 100px #fff;
  }
</style>
