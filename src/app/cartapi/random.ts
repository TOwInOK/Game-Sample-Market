export function rand_num(): number {
    const timestamp = new Date().getTime().valueOf();
    return Math.random() * (timestamp - 125324) + timestamp;
}