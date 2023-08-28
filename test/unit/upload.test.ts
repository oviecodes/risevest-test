import UploadService from '../../src/services/upload.service'
import { test, jest, describe, it } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('test uploads service', () => {
  it('should return true when upload is successful', async () => {
    const data = {
      name: 'Oby Dan',
      password: 'hybridtech',
      email: 'mockit',
    }
    const spy = jest.spyOn(UploadService, 'upload').mockResolvedValue({
      uploads: true,
    })

    const res = await UploadService.upload(data, 1)

    expect(res.uploads).toBe(true)
    expect(spy).toBeCalled()
  })

  it('login should return access token', async () => {
    const folder = 'Oby_Dan'

    const spy = jest.spyOn(UploadService, 'createFolder').mockResolvedValue([2])

    const res = await UploadService.createFolder(folder, 1)

    expect(res).toContain(2)
    expect(spy).toBeCalled()
  })
})
