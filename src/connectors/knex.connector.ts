import config from '../config/index.js'
import knexfile from '../../knexfile.mjs'
import pkg from 'knex'

const { knex } = pkg
const pg = knex(knexfile[config['NODE_ENV']])

export default pg
