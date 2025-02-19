import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('Testing categories endpoint', () => {
    describe('Testing GET method',  () => {
        test('Should respond OK status and return categories as an array. As per seed data, it should not be empty, and contain objects with an id and category name.', async () => {
            const response = await supertest(server).get('/api/v1/categories')
            
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String)
                    })
                ])
            )
        })
    })
})