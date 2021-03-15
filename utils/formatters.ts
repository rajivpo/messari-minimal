export const formatNumberHumanReadable = (num: number): string => {
    return num.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}