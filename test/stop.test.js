const Stop = require('../Stop.js')

const testStop = new Stop('A')

describe('addDestination', () => {
  test('addDestination should add the correct stop to the destination object', () => {
    testStop.addDestination('B', 5)
    expect(testStop.destinations['B']).toEqual(5)
  })

  test('addDestination should be able to add an indefinite number of destinations', () => {
    testStop.addDestination('C', 10)
    expect(Object.keys(testStop.destinations).length).toEqual(2)
  })
})
