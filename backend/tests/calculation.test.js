import seedDatabase, { calculationOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { CREATE_CALCULATION, DELETE_CALCULATION } from './operations/calculation';
import { Calculation } from '../src/server/db/models/Calculation';

const client = getClient()

beforeEach(seedDatabase)

describe('MUTATE /calculation', () => {
  test('Should create a calculation', async () => {
    let variables = {
      data: {
        title: 'Calculation 1',
      }
    }
    const { data } = await client.mutate({
      mutation: CREATE_CALCULATION, variables
    })
    
    expect(data.createCalculation.title).toBe('Calculation 1')
    expect(data.createCalculation.result).toBe(2)
    expect(data.createCalculation.order).toBe(1)
    
    const calculations = await Calculation.find({ isDeleted: false })
    expect(calculations.length).toBe(2)
  })
  
  // test('Should not create a calculation with INVALID input', async () => {
  //   let variables = {
  //     data: {
  //       title: 'Other fields must be required',
  //     }
  //   }
  //   await expect(
  //     client.mutate({ mutation: CREATE_CALCULATION, variables })
  //   ).rejects.toThrow()
  // })

  test('Should delete a calculation', async () => {
    let variables = {
      id: calculationOne.data.id
    }
    const { data } = await client.mutate({
      mutation: DELETE_CALCULATION, variables
    })

    const calculations = await Calculation.find({ isDeleted: false })
    expect(calculations.length).toBe(0)
    expect(data.deleteCalculation.title).toBe(calculationOne.data.title)
  })

})

