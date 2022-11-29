const formatDate = (date: Date): string => {
    return `${date.getMonth()}-${date.getUTCDate()}-${date.getFullYear()}`
}

export {
    formatDate,
}