import services from '@/app/services/axios'

const getShops = () => {
  return new Promise(async (resolve) => {
    try {
      const send = await services({
        method: 'get',
        url: '/recruitment'
      })

      resolve({ status: true, data: send.data })
    } catch (error) {
      resolve({ status: false, data: error })
    }
  })
}

export { getShops }
