import login from './login'
import house from './house'
import server from '../request/getRequest'

server.parseRouter('login', login)
server.parseRouter('house', house)

export default server