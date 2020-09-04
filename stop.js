class Stop {
  constructor(origin) {
    this.origin = origin
    this.destinations = {}
  }

  addDestination(destination, distance) {
    this.destinations[destination] = parseInt(distance)
  }
}

module.exports = Stop
