import bcrypt from 'bcrypt'
import * as TestDatabase from '../utils/TestDatabase'
import User from '../../src/models/User'

describe('User model', () => {
  beforeAll(TestDatabase.connect)
  beforeEach(() => jest.clearAllMocks())
  afterEach(() => jest.restoreAllMocks())

  const createTestUser = async (username: string, password: string) => {
    const rawUser = await new User({
      username,
      password,
    })

    return rawUser.save()
  }

  it("will encrypt user's password", async () => {
    const rawUser = await createTestUser('User-1', 'password')

    expect(rawUser.password).toBeDefined()
    expect(rawUser.password).not.toEqual('password')
  })

  it('will hide passwords and versions in queries', async () => {
    const users = await User.find().exec()

    expect(users.length).toBe(1)

    const user = users[0]

    expect(user.password).not.toBeDefined()
    expect(user.__v).not.toBeDefined()
  })

  it('compares clear-text password with encrypted password', async () => {
    const rawUser = await createTestUser('User-2', 'password')

    expect(await rawUser.comparePassword('some random string')).toBeFalsy()
    expect(await rawUser.comparePassword('password')).toBeTruthy()
  })

  it('handles invalid hashes in comparePassword method', async () => {
    const rawUser = await createTestUser('User-3', 'password')

    // Replace the password with an invalid hash
    rawUser.password = 'invalid_hash'
    await rawUser.save()

    const result = await rawUser.comparePassword('password')
    expect(result).toBeFalsy()
  })

  it('handles errors in comparePassword method', async () => {
    const rawUser = await createTestUser('User-4', 'password')

    // Mock bcrypt.compare to simulate an error
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce((_, __, callback) => {
      callback(new Error('Mocked bcrypt error'), false)
    })

    await expect(rawUser.comparePassword('password')).rejects.toThrow(
      'Mocked bcrypt error',
    )
  })

  afterAll(TestDatabase.close)
})
