
const Subscription = {
  calculation: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('newCalculation')
    }
  },
}

export default Subscription