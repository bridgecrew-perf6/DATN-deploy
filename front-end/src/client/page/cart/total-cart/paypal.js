import React, { useRef, useEffect } from 'react'
import { post } from '../../../../api/BaseRequest'

const Paypal = ({ total, info, setCheckout, setListProductId, setStatusCreateOrder, setMessageDialog, setDialogSuccess, listProductId, deleteProductAfterBuySuccess }) => {
  
  console.log(listProductId)

  const USD = 22957
  const paypal = useRef()
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              description: 'cool looking table',
              amount: {
                currency_code: 'USD',
                value: Math.round(Math.floor(total / USD)),
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        await actions.order.capture()
        const newOrder = {
          ...info,
          paymentResult: 'Đã thanh toán',
          status: 'Đang giao',
          isPaid: true,
        }
        await post('orders', newOrder)
        setCheckout(false)
        setStatusCreateOrder(false)
        setDialogSuccess(true)
        deleteProductAfterBuySuccess(listProductId)
        setMessageDialog('Mua hàng thành công')
        setListProductId([])
      },
      onError: (err) => {
        console.log(err)
      }
    }).render(paypal.current)
  }, [])

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}
export default Paypal
