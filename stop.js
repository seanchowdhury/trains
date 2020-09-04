class Stop {
  constructor(origin, destination, distance) {
    this.origin = origin
    this.destinations = {}
    this.destinations[destination] = parseInt(distance)
  }

  addDestination(destination, distance) {
    this.destinations[destination] = parseInt(distance)
  }
}

module.exports = Stop
