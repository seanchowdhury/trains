const Stop = require('./stop.js')

class Railway {
  constructor(graph) {
    this.routeTable = {}
    this._populateRouteTable(graph)
  }

  findDistance(route) {
    const stops = route.split("-")

    let distance = 0, routeDistance, currentStop = stops[0]

    try {
      stops.slice(1).forEach(nextStop => {
        routeDistance = this.routeTable[currentStop].destinations[nextStop]
        if(!routeDistance) {
          throw "NO SUCH ROUTE"
        }
        distance += routeDistance
        currentStop = nextStop
      })
    } catch(exception) {
      return exception
    }

    return distance
  }

  findRoutesByMaxStops(origin, destination, numStops) {
    let validRoutes = 0

    Object.keys(this.routeTable[origin].destinations).forEach(node => {
      if(destination === node) {
        validRoutes += 1
      }
      if(numStops > 1) {
        validRoutes += this.findRoutesByMaxStops(node, destination, numStops-1)
      }
    })

    return validRoutes
  }

  findRoutesByExactStops(origin, destination, numStops) {
    let validRoutes = 0

    Object.keys(this.routeTable[origin].destinations).forEach(node => {
      if(numStops > 1) {
        validRoutes += this.findRoutesByExactStops(node, destination, numStops-1)
      } else if(node === destination) {
        validRoutes += 1
      }
    })

    return validRoutes
  }

  findShortestDistance(origin, destination, traversed = []) {
    let distance = this.routeTable[origin].destinations[destination]

    const untraversed = this._filterTraversed(this.routeTable[origin].destinations, traversed)
    untraversed.forEach(node => {
      if(this.routeTable[node]) {
        const current = this.findShortestDistance(node, destination, traversed.concat(origin)) + this.routeTable[origin].destinations[node]
        if(!distance || distance > current) {
          distance = current
        }
      }
    })

    return distance
  }

  findRoutesByDistance(origin, destination, maxDistance) {
    let validRoutes = 0

    Object.keys(this.routeTable[origin].destinations).forEach(node => {
      const routeDistance = this.routeTable[origin].destinations[node]
      if(maxDistance > routeDistance) {
        if(destination === node) {
          validRoutes += 1
        }

        validRoutes += this.findRoutesByDistance(node, destination, maxDistance - routeDistance)
      }
    })

    return validRoutes
  }

  _populateRouteTable(graph) {
    graph.split(', ').forEach((route, idx) => {
      const [origin, destination] = route.split("")
      const distance = route.slice(2)

      if(this.routeTable[origin]) {
        this.routeTable[origin].addDestination(destination, distance)
      } else {
        this.routeTable[origin] = new Stop(origin)
        this.routeTable[origin].addDestination(destination, distance)
      }
    })
  }

  _filterTraversed(destinations, traversed) {
    let filtered = []

    Object.keys(destinations).forEach(key => {
      if(!traversed.includes(key)) {
        filtered.push(key)
      }
    })

    return filtered;
  }
}

module.exports = Railway
