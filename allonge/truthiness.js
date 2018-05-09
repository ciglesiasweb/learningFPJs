const or = (a, b) => a() || b()

const and = (a, b) => a() && b()

const even = (n) =>
    or(() => n === 0,
        () => and(
            () => n !== 1,
            () => even(n - 2))
    )


even(7)