import UserService from '../../src/services/user.service'
import { test, jest, describe, it } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('test register service', () => {
  it('should return an access token', async () => {
    const data = {
      name: 'Oby Dan',
      password: 'hybridtech',
      email: 'mockit',
    }
    const spy = jest.spyOn(UserService, 'register').mockResolvedValue({
      accessToken: 'sgehhahbenb.buwj.nwjhre',
    })

    const res = await UserService.register(data)

    expect(res.accessToken).toBe('sgehhahbenb.buwj.nwjhre')
    expect(spy).toBeCalled()
  })

  it('login should return access token', async () => {
    const data = {
      name: 'Oby Dan',
      password: 'hybridtech',
    }

    const spy = jest.spyOn(UserService, 'login').mockResolvedValue({
      accessToken: 'sgehhahbenb.buwj.nwjhre',
    })

    const res = await UserService.login(data)

    expect(res.accessToken).toBe('sgehhahbenb.buwj.nwjhre')
    expect(spy).toBeCalled()
  })
})
