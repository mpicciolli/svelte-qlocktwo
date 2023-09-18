
import { derived, readable } from 'svelte/store';
import { lang } from "../stores/app.store";
import { qlocktwoConfigs } from '../models/QlocktwoConfig';
import dayjs from 'dayjs';

const qlocktwoFaceConfig = derived(lang, ($lang) => qlocktwoConfigs[$lang]);

const date = readable(dayjs(), (set) => {
    set(dayjs());

    const interval = setInterval(() => {
        set(dayjs());
    }, 1000);

    return () => clearInterval(interval);
});

export const qlocktwoFace = derived([date, qlocktwoFaceConfig], ([$date, $qlocktwoFaceConfig]) => {
    let qlockface = $qlocktwoFaceConfig.clockFace.map((row) => {
        return row.map((v) => {
            return { letter: v, isHighlighted: false };
        });
    });

    let hour = $date.format("h");
    let minute = getMinuteRounded($date.minute());
    const s = $qlocktwoFaceConfig.sentences.default;
    const h = $qlocktwoFaceConfig.sentences.hours[hour];
    const m = $qlocktwoFaceConfig.sentences.minutes[minute];

    return qlockface.map((rows, i) => {
        return rows.map((row, j) => {
            row.isHighlighted =
                [...s, h, ...m].findIndex((v) => {
                    return v[0] == i && j >= v[1] && j <= v[2];
                }) > -1;
            return row;
        });
    });
});

function getMinuteRounded(minute: number): number {
    return Math.round(minute / 5) * 5;
}
