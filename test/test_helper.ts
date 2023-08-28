import knexfile from '../knexfile.mjs'
import { knex } from '../src/connectors/knex.connector.js'

const db = knex(knexfile['test'])

export const users = [
  {
    name: 'Oby Dan',
    email: 'oby@gmail.com',
    password: 'hybridtech',
  },
]

export const initialUploads = [
  {
    name: 'Screenshot+2023-08-21+at+2.31.34+PM.png',
    slug: 'screenshot+2023-08-21+at+2.31.34+pm.png',
    userId: 1,
    size: 791221,
    ETag: '"c2c4ef538b79cfdc7166ca37afdcfde3"',
    VersionId: 'T014.1tERcs1xWn8z9jGnhu9ZP3iN7pu',
    safe: true,
  },
  {
    name: 'Screenshot 2023-06-13 at 6.01.23 PM.png',
    slug: 'screenshot-2023-06-13-at-6.01.23-pm.png',
    userId: 1,
    size: 173879,
    ETag: '"d6456380a79f22c03430ed541712b8b1"',
    VersionId: 'T.ZZhxykcCxZ4sLR9HhjE5s_FrBfChIC',
    safe: true,
  },
]

export const nonExist = {
  name: 'Screenshot 2023-06-13 at 6.01.23 PM.png',
  slug: 'screenshot-2023-06-13-at-6.01.23-pm.png',
  userId: 1,
  size: 173879,
  ETag: '"d6456380a79f22c03430ed541712b8b1"',
  VersionId: 'T.ZZhxykcCxZ4sLR9HhjE5s_FrBfChIC',
  safe: true,
}

export const nonExistingId = async () => {
  const upload = await db.table('uploads').insert(nonExist, ['id'])
  const id = upload[0].id
  await db.table('uploads').where('id', id).del()

  return id
}

export const imagesInDb = async () => {
  return db.table('images')
}

export const folder = {
  folder: 'happy days',
}
