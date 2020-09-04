const Railway = require('../index.js');
const Stop = require('../stop.js');

let sampleGraph = 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7, XY1000, XZ1, ZY1'
let testRailway = new Railway(sampleGraph)

describe('RouteTable', () => {
  test('Railway should create Stop object for each node in the graph', () => {
    expect(testRailway.routeTable['A']).toBeInstanceOf(Stop)
  })

  test('A stop should have the correct number of destinations', () => {
    expect(Object.keys(testRailway.routeTable['A'].destinations).length).toEqual(3)
  })
})

describe('findShortestDistance', () => {
  test('findShortestDistance should find the shortest distance between nodes with no stops', () => {
    expect(testRailway.findShortestDistance('A', 'B')).toEqual(5)
  })

  // Test Case 8
  test('findShortestDistance should find the shortest distance between nodes with one stop', () => {
    expect(testRailway.findShortestDistance('A', 'C')).toEqual(9)
  })

  // Test Case 9
  test('findShortestDistance should find the shortest distance between nodes with multiple stops', () => {
    expect(testRailway.findShortestDistance('B', 'B')).toEqual(9)
  })

  test('findShortestDistance should not prioritize routes with less stops', () => {
    expect(testRailway.findShortestDistance('X', 'Y')).toEqual(2)
  })
})

describe('findDistance', () => {
  //Test Case 2
  test('findDistance should return the correct distance between two nodes', () => {
    expect(testRailway.findDistance('A-D')).toEqual(5)
  })

  //Test Case 1
  test('findDistance should return the correct distance for trip with multiple stops', () => {
    expect(testRailway.findDistance('A-B-C')).toEqual(9)
  })

  //Test Case 5
  test('findDistance should return NO SUCH ROUTE if an invalid route is given', () => {
    expect(testRailway.findDistance('A-E-D')).toEqual('NO SUCH ROUTE')
  })

  test('Test Case 3', () => {
    expect(testRailway.findDistance('A-D-C')).toEqual(13)
  })

  test('Test Case 4', () => {
    expect(testRailway.findDistance('A-E-B-C-D')).toEqual(22)
  })
})

describe('findRoutes', () => {
  //Test Case 6
  test('findRoutesByMaxStops should return number of routes between two nodes within stop limit',  () => {
    expect(testRailway.findRoutesByMaxStops('C', 'C', 3)).toEqual(2)
  })

  //Test Case 7
  test('findRoutesByExactStops should return number of routes with exact about of routes', () => {
    expect(testRailway.findRoutesByExactStops('A', 'C', 4)).toEqual(3)
  })
})

describe('findRoutesByDistance', () => {
  //Test Case 10
  test('findRoutesByDistance should return the number of routes within distance limit', () => {
    expect(testRailway.findRoutesByDistance('C', 'C', 30)).toEqual(7)
  })
})
