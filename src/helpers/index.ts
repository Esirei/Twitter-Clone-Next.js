type FilterOut = boolean | undefined | null
export const c = (...classes: (string | FilterOut)[]) => classes.filter(Boolean).join(' ')
