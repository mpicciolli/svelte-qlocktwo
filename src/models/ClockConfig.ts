export interface ClockConfig {
    sentences: {
        default: number[][];
        hours: {
            [key: string]: number[];
        };
        minutes: {
            [key: string]: number[][];
        };
    };
}