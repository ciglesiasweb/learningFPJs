function forward(receiver, metaobject, ...methods) {
    methods.forEach(function (methodName) {
        receiver[methodName] = (...args) => metaobject[methodName](...args)
    });
    return receiver;
};

const portfolio = (function () {
    const investments = Symbol();
    return {
        [investments]: [],
        addInvestment(investment) {
            this[investments].push(investment);
        },
        netWorth() {
            return this[investments].reduce(
                function (acc, investment) {
                    return acc + investment.value;
                },
                0
            );
        }
    };
})();

const investor = forward({}, portfolio, "addInvestment", "netWorth");

portfolio.netWorth = function () {
    return "I'm actually bankrupt!";
    }
    
investor.addInvestment({ type: "art", value: 1000000 })
investor.addInvestment({ type: "art", value: 2000000 })
console.log(
    investor.netWorth()
)