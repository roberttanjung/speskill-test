import { useState, useEffect, Fragment } from 'react'
import { getShops } from './services'

// group: set
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const HomeShopItem = ({ item, index, onQuantity }) => {
  // group: state
  const [fdQuantity, setFdQuantity] = useState(0)

  // group: state
  useEffect(() => {
    return () => {
      setFdQuantity(0)
    }
  }, [])

  useEffect(() => { onQuantity(fdQuantity, index) }, [fdQuantity])

  return (
    <Fragment>
      <td className="border-t-[1px]" valign="middle">
        <div className="p-3">
          <div className="flex">
            <div id="item:photo" className="h-28 w-28">
              <img src={item.product.media_url} className="max-h-full max-w-full" />
            </div>
            <div id="item:desc" className="pl-5">
              <div id="desc:code" className="text-xs text-blue-500 font-bold">{item.product.code}</div>
              <div id="desc:name">{item.product.name}</div>
              <div id="desc:price" className="mt-2 text-gray-400">IDR {numberWithCommas(item.product.price)}</div>
              <div id="desc:stock" className="text-red-500 text-xs mt-2">{item.product.stock} in stock</div>
            </div>
          </div>
        </div>
      </td>
      <td className="border-t-[1px]" align="center" valign="middle">
        <div className="p-3">
          <input
            value={fdQuantity}
            type="number"
            className="h-[40px] w-[40px] border-2 border-gray-400 text-center"
            onChange={(e) => setFdQuantity(e.currentTarget.value)}
          />
        </div>
      </td>
      <td className="border-t-[1px]" valign="middle">
        <div className="p-3 text-gray-400">
          IDR {numberWithCommas(item.subtotal)}
        </div>
      </td>
    </Fragment>
  )
}

const HomeShop = () => {
  // group: state
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  // group: get
  const getDatas = async () => {
    let set = []
    const send = await getShops()

    if (send.status) {
      send.data.forEach((item) => {
        set.push({ ...item, subtotal: 0 })
      })
    }

    setItems(set)
  }

  // group: action
  const onQuantity = (data, index) => {
    let setItems2 = [...items]

    setItems2[index].subtotal = (data * setItems2[index].product.price)

    setItems(setItems2)
  }

  const onTotal = () => {
    let set = 0

    items.forEach((item) => {
      set += item.subtotal
    })

    setTotal(set)
  }

  // group: watch
  useEffect(() => { getDatas() }, [])
  useEffect(() => { onTotal() }, [items])

  return (
    <section className="py-8 px-10 pt-14 bg-grey-light">
      <h1 id="box:title" className="text-center text-4xl font-bold">
        SPE Frontend Shop
      </h1>
      <div id="box:products" className="p-3 mt-7 bg-white">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4 bg-black text-white" align="center">PRODUCT</th>
              <th className="p-4 bg-black text-white" align="center">QUANTITY</th>
              <th className="p-4 bg-black text-white" align="center">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, itemIndex) => (
              <tr key={itemIndex}>
                <HomeShopItem item={item} index={itemIndex} onQuantity={onQuantity} />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-4 bg-black text-xl text-white" align="right" colSpan={100}>
                TOTAL IDR {numberWithCommas(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default HomeShop
