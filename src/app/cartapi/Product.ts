export interface Product {
    id: number;
    name: string;
    stats: Stats;
    price: number;
}

export interface Stats {
    vec: Stat[]
}
export interface Stat {
    value: number | string;
    stat: string
}

