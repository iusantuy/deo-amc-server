export const tryCatchHandler = (fn) => {
    return (ctx, next) => {
        fn(ctx).catch(next)
    }
}