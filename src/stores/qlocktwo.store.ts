
import { derived } from 'svelte/store';
import { lang } from "../stores/app.store";
import { qlockTwoConfigs } from '../models/ClockConfig';

export const qlockTwoConfig = derived(lang, ($lang) => qlockTwoConfigs[$lang]);