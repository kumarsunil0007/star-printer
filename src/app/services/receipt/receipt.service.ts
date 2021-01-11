import { Injectable } from '@angular/core'
import { StarPRNT, RasterObj, CommandsArray } from '@ionic-native/star-prnt/ngx'
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private starprnt: StarPRNT) { }
  rasterReceiptExample(paperSize: string): RasterObj {

    const twoInchRasterImage: RasterObj = {
      text: ' Star Clothing Boutique\n' +
        '        123 Star Road\n' +
        '      City, State 12345\n' +
        '\n' +
        'Date:MM/DD/YYYY Time:HH:MM PM\n' +
        '-----------------------------\n' +
        'SALE\n' +
        'SKU       Description   Total\n' +
        '300678566 PLAIN T-SHIRT 10.99\n' +
        '300692003 BLACK DENIM   29.99\n' +
        '300651148 BLUE DENIM    29.99\n' +
        '300642980 STRIPED DRESS 49.99\n' +
        '30063847  BLACK BOOTS   35.99\n' +
        '\n' +
        'Subtotal               156.95\n' +
        'Tax                      0.00\n' +
        '-----------------------------\n' +
        'Total                 $156.95\n' +
        '-----------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        'Refunds and Exchanges\n' +
        'Within 30 days with receipt\n' +
        'And tags attached\n',
      paperWidth: 384,
      fontSize: 22,
      cutReceipt: true,
      openCashDrawer: false
    }
    const threeInchRasterImage: RasterObj = {
      text: '    Star Clothing Boutique\n' +
        '             123 Star Road\n' +
        '           City, State 12345\n' +
        '\n' +
        'Date:MM/DD/YYYY          Time:HH:MM PM\n' +
        '--------------------------------------\n' +
        'SALE\n' +
        'SKU            Description       Total\n' +
        '300678566      PLAIN T-SHIRT     10.99\n' +
        '300692003      BLACK DENIM       29.99\n' +
        '300651148      BLUE DENIM        29.99\n' +
        '300642980      STRIPED DRESS     49.99\n' +
        '30063847       BLACK BOOTS       35.99\n' +
        '\n' +
        'Subtotal                        156.95\n' +
        'Tax                               0.00\n' +
        '--------------------------------------\n' +
        'Total                          $156.95\n' +
        '--------------------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        'Refunds and Exchanges\n' +
        'Within 30 days with receipt\n' +
        'And tags attached\n',
      paperWidth: 576,
      fontSize: 25,
      cutReceipt: true,
      openCashDrawer: false
    }
    const fourInchRasterImage: RasterObj = {
      text: '               Star Clothing Boutique\n' +
        '                        123 Star Road\n' +
        '                      City, State 12345\n' +
        '\n' +
        'Date:MM/DD/YYYY                             Time:HH:MM PM\n' +
        '---------------------------------------------------------\n' +
        'SALE\n' +
        'SKU                     Description                 Total\n' +
        '300678566               PLAIN T-SHIRT               10.99\n' +
        '300692003               BLACK DENIM                 29.99\n' +
        '300651148               BLUE DENIM                  29.99\n' +
        '300642980               STRIPED DRESS               49.99\n' +
        '300638471               BLACK BOOTS                 35.99\n' +
        '\n' +
        'Subtotal                                           156.95\n' +
        'Tax                                                  0.00\n' +
        '---------------------------------------------------------\n' +
        'Total                                             $156.95\n' +
        '---------------------------------------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        'Refunds and Exchanges\n' +
        'Within 30 days with receipt\n' +
        'And tags attached\n',
      paperWidth: 832,
      fontSize: 23,
      cutReceipt: true,
      openCashDrawer: false
    }

    switch (paperSize) {
      case '2':
        return twoInchRasterImage
      case '3':
        return threeInchRasterImage
      case '4':
        return fourInchRasterImage
      default:
        return threeInchRasterImage
    }

  }


  getExampleReceipt(paperSize: string, horizontalTab?: boolean, qrCodeExample?: boolean): CommandsArray {

    /* Two Inches receipt*/

    const twoInchReceipt: CommandsArray = []
    twoInchReceipt.push({ appendInternational: this.starprnt.InternationalType.UK })
    twoInchReceipt.push({ appendCharacterSpace: 0 })
    twoInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Center })
    twoInchReceipt.push({
      append:
        'Star Clothing Boutique\n' +
        '123 Star Road\n' +
        'City, State 12345\n' +
        '\n'
    })
    twoInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Left })
    twoInchReceipt.push({
      append:
        'Date:MM/DD/YYYY    Time:HH:MM PM\n' +
        '--------------------------------\n' +
        '\n'
    })
    twoInchReceipt.push({ appendEmphasis: 'SALE\n' })
    twoInchReceipt.push({
      append:
        'SKU         Description    Total\n' +
        '300678566   PLAIN T-SHIRT  10.99\n' +
        '300692003   BLACK DENIM    29.99\n' +
        '300651148   BLUE DENIM     29.99\n' +
        '300642980   STRIPED DRESS  49.99\n' +
        '300638471   BLACK BOOTS    35.99\n' +
        '\n' +
        'Subtotal                  156.95\n' +
        'Tax                         0.00\n' +
        '--------------------------------\n'
    })
    twoInchReceipt.push({ append: 'Total     ' })
    twoInchReceipt.push({ appendMultiple: '   $156.95\n', width: 2, height: 2 })
    twoInchReceipt.push({
      append:
        '--------------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        '\n'
    })
    twoInchReceipt.push({ appendInvert: 'Refunds and Exchanges\n' })
    twoInchReceipt.push({ append: 'Within ' })
    twoInchReceipt.push({ appendUnderline: '30 days' })
    twoInchReceipt.push({ append: ' with receipt\n' })
    twoInchReceipt.push({
      append:
        'And tags attached\n' +
        '\n'
    })
    twoInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Center })
    if (qrCodeExample) { // print QRCode
      twoInchReceipt.push({
        appendQrCode: '{BStar',
        QrCodeModel: 'No2',
        QrCodeLevel: 'L',
        cell: 8
      })
    } else { // print normal Barcode
      twoInchReceipt.push({
        appendBarcode: '{BStar.',
        BarcodeSymbology: this.starprnt.BarcodeSymbology.Code128,
        BarcodeWidth: this.starprnt.BarcodeWidth.Mode2,
        height: 40,
        hri: true
      })
    }
    twoInchReceipt.push({ appendLineFeed: 2 })
    twoInchReceipt.push({ appendCutPaper: this.starprnt.CutPaperAction.PartialCutWithFeed })

    /* Three Inches receipt*/

    const threeInchReceipt: CommandsArray = []
    threeInchReceipt.push({ appendInternational: this.starprnt.InternationalType.UK })
    threeInchReceipt.push({ appendCharacterSpace: 0 })
    threeInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Center })
    threeInchReceipt.push({
      append:
        'Star Clothing Boutique\n' +
        '123 Star Road\n' +
        'City, State 12345\n' +
        '\n'
    })
    threeInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Left })
    threeInchReceipt.push({
      append:
        'Date:MM/DD/YYYY                    Time:HH:MM PM\n' +
        '------------------------------------------------\n' +
        '\n'
    })
    threeInchReceipt.push({ appendEmphasis: 'SALE\n' })

    if (horizontalTab) {
      // Only works for certain printers, check the StarSDK command compatiblity chart
      threeInchReceipt.push({ appendHorizontalTabPosition: [15, 40] })
      threeInchReceipt.push({ append: '\n*Tab Position:\t15, \t40*\n' })
      threeInchReceipt.push({ append: 'SKU\tDescription\tTotal\n' })
      threeInchReceipt.push({ append: '300678566\tPLAIN T-SHIRT\t10.99\n' })
      threeInchReceipt.push({ append: '300692003\tBLACK DENIM\t29.99\n' })
      threeInchReceipt.push({ append: '300651148\tBLUE DENIM\t29.99\n' })
      threeInchReceipt.push({ append: '300642980\tSTRIPED DRESS\t49.99\n' })
      threeInchReceipt.push({ append: '300638471\tBLACK BOOTS\t35.99\n' })
      threeInchReceipt.push({ appendHorizontalTabPosition: [] }) // Clear the horizontal tab postion

      threeInchReceipt.push({ appendLineFeed: 1 })
      threeInchReceipt.push({ appendHorizontalTabPosition: [40] })
      threeInchReceipt.push({ append: 'Subtotal\t156.95\n' })
      threeInchReceipt.push({ append: 'Tax\t  0.00\n' })
      threeInchReceipt.push({ append: '---------------------------------------------\n' })

      threeInchReceipt.push({ appendHorizontalTabPosition: [] }) // Clear the horizontal tab postion

    } else {
      threeInchReceipt.push({
        append:
          'SKU               Description              Total\n' +
          '300678566         PLAIN T-SHIRT            10.99\n' +
          '300692003         BLACK DENIM              29.99\n' +
          '300651148         BLUE DENIM               29.99\n' +
          '300642980         STRIPED DRESS            49.99\n' +
          '300638471         BLACK BOOTS              35.99\n' +
          '\n' +
          'Subtotal                                  156.95\n' +
          'Tax                                         0.00\n' +
          '------------------------------------------------\n'
      })
    }
    threeInchReceipt.push({ append: 'Total                       ' })
    threeInchReceipt.push({ appendMultiple: '   $156.95\n', width: 2, height: 2 })
    threeInchReceipt.push({
      append:
        '------------------------------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        '\n'
    })
    threeInchReceipt.push({ appendInvert: 'Refunds and Exchanges\n' })
    threeInchReceipt.push({ append: 'Within ' })
    threeInchReceipt.push({ appendUnderline: '30 days' })
    threeInchReceipt.push({ append: ' with receipt\n' })
    threeInchReceipt.push({
      append:
        'And tags attached\n' +
        '\n'
    })
    threeInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Center })
    if (qrCodeExample) { // print QRCode
      threeInchReceipt.push({
        appendQrCode: '{BStar',
        QrCodeModel: 'No2',
        QrCodeLevel: 'L',
        cell: 8
      })
    } else { // print normal Barcode
      threeInchReceipt.push({
        appendBarcode: '{BStar.',
        BarcodeSymbology: this.starprnt.BarcodeSymbology.Code128,
        BarcodeWidth: this.starprnt.BarcodeWidth.Mode2,
        height: 40,
        hri: true
      })
      threeInchReceipt.push({ appendLineFeed: 2 })
    }
    threeInchReceipt.push({ appendCutPaper: this.starprnt.CutPaperAction.PartialCutWithFeed })


    /* Four Inches receipt*/

    const fourInchReceipt: CommandsArray = []
    fourInchReceipt.push({ appendInternational: this.starprnt.InternationalType.UK })
    fourInchReceipt.push({ appendCharacterSpace: 0 })
    fourInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Center })
    fourInchReceipt.push({
      append:
        'Star Clothing Boutique\n' +
        '123 Star Road\n' +
        'City, State 12345\n' +
        '\n'
    })
    fourInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Left })
    fourInchReceipt.push({
      append:
        'Date:MM/DD/YYYY                                         Time:HH:MM PM\n' +
        '---------------------------------------------------------------------\n' +
        '\n'
    })
    fourInchReceipt.push({ appendEmphasis: 'SALE\n' })
    fourInchReceipt.push({
      append:
        'SKU                        Description                          Total\n' +
        '300678566                  PLAIN T-SHIRT                        10.99\n' +
        '300692003                  BLACK DENIM                          29.99\n' +
        '300651148                  BLUE DENIM                           29.99\n' +
        '300642980                  STRIPED DRESS                        49.99\n' +
        '300638471                  BLACK BOOTS                          35.99\n' +
        '\n' +
        'Subtotal                                                       156.95\n' +
        'Tax                                                              0.00\n' +
        '---------------------------------------------------------------------\n'
    })
    fourInchReceipt.push({ append: 'Total                                            ' })
    fourInchReceipt.push({ appendMultiple: '   $156.95\n', width: 2, height: 2 })
    fourInchReceipt.push({
      append:
        '---------------------------------------------------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        '\n'
    })
    fourInchReceipt.push({ appendInvert: 'Refunds and Exchanges\n' })
    fourInchReceipt.push({ append: 'Within ' })
    fourInchReceipt.push({ appendUnderline: '30 days' })
    fourInchReceipt.push({ append: ' with receipt\n' })
    fourInchReceipt.push({
      append:
        'And tags attached\n' +
        '\n'
    })
    fourInchReceipt.push({ appendAlignment: this.starprnt.AlignmentPosition.Center })
    if (qrCodeExample) { // print QRCode
      fourInchReceipt.push({
        appendQrCode: '{BStar',
        QrCodeModel: 'No2',
        QrCodeLevel: 'L',
        cell: 8
      })
    } else { // print normal Barcode
      fourInchReceipt.push({
        appendBarcode: '{BStar.',
        BarcodeSymbology: this.starprnt.BarcodeSymbology.Code128,
        BarcodeWidth: this.starprnt.BarcodeWidth.Mode2,
        height: 40,
        hri: true
      })
    }
    fourInchReceipt.push({ appendLineFeed: 2 })
    fourInchReceipt.push({ appendCutPaper: this.starprnt.CutPaperAction.PartialCutWithFeed })

    switch (paperSize) {
      case '2':
        return twoInchReceipt
      case '3':
        return threeInchReceipt
      case '4':
        return fourInchReceipt
      default:
        return threeInchReceipt
    }

  }
  wordWrap(str, maxWidth, useTab?: number) {
    const newLineStr = '<br>'
    const tabChar = useTab === undefined ? '' : '\t'
    let res = ''
    while (str.length > maxWidth) {
      let found = false
      // Inserts new line at first whitespace of the line
      for (let i = maxWidth - 1; i >= 0; i--) {
        if (this.testWhite(str.charAt(i))) {
          res = res + [str.slice(0, i), newLineStr, tabChar].join('')
          str = str.slice(i + 1)
          found = true
          break
        }
      }
      // Inserts new line at maxWidth position, the word is too long to wrap
      if (!found) {
        res += [str.slice(0, maxWidth), newLineStr, tabChar].join('')
        str = str.slice(maxWidth)
      }
    }

    return res + str
  }

  testWhite(x) {
    const white = new RegExp(/^\s$/)
    return white.test(x.charAt(0))
  }

  formatPhoneNumber(s) {
    s = s.toString()
    if (s.length !== 10) {
      return s
    }
    const s2 = ('' + s).replace(/\D/g, '')
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/)
    return !m ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3]
  }

  formatOrder(order) {
    let restaurantAddress = order.restaurant.formatted_address.replace(
      '↵',
      '\\n'
    )
    restaurantAddress = restaurantAddress.replace(/\s+/g, ' ').trim()
    const orderTimeOrg = order.order_time.seconds
    // const timeStamp = order.order_time.toDate()
    const timeStamp = order.order_time.seconds * 1000

    const orderDate = moment(timeStamp).format('MMM DD, YYYY')
    const orderTime = moment(orderTimeOrg).format('hh:mm A')

    const createdTimeSec = order.created_at.seconds
    const createdTimestamp = order.created_at.seconds * 1000
    const createdDate = moment(createdTimestamp).format(
      'MMM DD, YYYY'
    )
    const createdTime = moment(createdTimeSec).format('hh:mm A')

    const items = order.cart
    const ref = order.id.replace('ordr_', '')
    let receipt = ''
    receipt += '\n<br>' + order.restaurant.business_name + '</br>'
    receipt += '\n\t' + this.wordWrap(restaurantAddress, 25, 1) + '\n'
    receipt += '\n\n' + '--------------------------------------'
    receipt +=
      '\n' + '                ' + order.type.toUpperCase() + '                '
    receipt += '\n' + '--------------------------------------\n'

    receipt += '\n' + 'Scheduled:   ' + orderDate + '    ' + orderTime + '\n'
    // Customer Info
    receipt += '\n' + order.customer.name.first + ' ' + order.customer.name.last
    // receipt += '\n' + this.formatPhoneNumber(order.customer.phone)
    if (order.type === 'Delivery') {
      receipt += '\n' + order.delivery_address.replace('↵', ', ')
    }
    // Order Ref
    receipt += '\n\n' + '         Order Ref: ' + ref + '      '
    receipt += '\n' + '     Ordered At:' + createdDate + ' ' + createdTime + ''
    receipt += '\n\n' + '--------------------------------------\n'
    // receipt += '\n' + 'Item                       Qty.  Price'
    // receipt += '\n' + '--------------------------------------\n'
    items.forEach((item) => {
      let itemName = this.wordWrap(item.title, 25)
      if (itemName.length < 25) {
        itemName = itemName + ' '.repeat(24 - itemName.length)
      }
      receipt +=
        item.quantity +
        'x ' +
        itemName +
        '\t   $' +
        parseFloat(item.total).toFixed(2) +
        '\n'
      if (item.order_selections.length) {
        const subItems = item.order_selections
        subItems.forEach((subItem) => {
          if (subItem.selections.length) {
            const toppings = subItem.selections
            toppings.forEach((topping) => {
              if (topping.quantity) {
                let toppingName = this.wordWrap(topping.label, 22, 1)
                if (toppingName.length < 25) {
                  toppingName =
                    toppingName + ' '.repeat(21 - toppingName.length)
                }
                const price =
                  topping.price !== ''
                    ? '\t   $' + parseFloat(topping.price).toFixed(2)
                    : ''

                receipt +=
                  '   ' + topping.quantity + 'x ' + toppingName + price + '\n'
              }
            })
          }
        })
      }
    })
    receipt += '\n--------------------------------------\n'
    receipt +=
      'Subtotal                       \t$' +
      parseFloat(order.sub_total).toFixed(2) +
      '\n'
    receipt +=
      'Tax                            \t$' +
      parseFloat(order.tax_total).toFixed(2) +
      '\n'
    receipt +=
      'Gratuity                       \t$' +
      parseFloat(order.grat_total).toFixed(2) +
      '\n'
    if (order.type === 'Delivery') {
      receipt +=
        'Service Charges              \t$' +
        parseFloat(order.delivery_charge).toFixed(2) +
        '\n'
    }
    // receipt += '--------------------------------------\n'
    receipt +=
      'Total                          \t$' +
      parseFloat(order.total).toFixed(2) +
      '\n'
    // receipt += '--------------------------------------\n'
    receipt += '\n\n'
    receipt += '         Powered by menuCLOUD           '

    console.log('Receipt\n', receipt)
    return {
      text: receipt,
      paperWidth: 576,
      fontSize: 25,
      cutReceipt: true,
      openCashDrawer: false
    }
  }



  demoReceipt(order) {
    const threeInchReceipt = []
    const qrCode = false

    let restaurantAddress = order.restaurant.formatted_address.replace(
      '↵',
      '\\n'
    )
    restaurantAddress = restaurantAddress.replace(/\s+/g, ' ').trim()
    const orderTimeOrg = order.order_time.seconds
    console.log(
      'orderTime',
      orderTimeOrg,
      moment(orderTimeOrg).format('MM/DD/YYYY hh:mm A')
    )
    const orderDate = moment(orderTimeOrg).format('MM/DD/YYYY')
    const orderTime = moment(orderTimeOrg).format('hh:mm A')
    const items = order.cart
    threeInchReceipt.push({
      appendInternational: this.starprnt.InternationalType.UK
    })
    threeInchReceipt.push({ appendCharacterSpace: 0 })
    threeInchReceipt.push({
      appendAlignment: this.starprnt.AlignmentPosition.Center
    })
    threeInchReceipt.push({
      append: order.restaurant.business_name + '\n' + restaurantAddress + '\n'
    })
    threeInchReceipt.push({
      appendAlignment: this.starprnt.AlignmentPosition.Right
    })
    threeInchReceipt.push({
      append: 'Order Type :' + order.type + '\n'
    })
    threeInchReceipt.push({
      appendAlignment: this.starprnt.AlignmentPosition.Left
    })
    threeInchReceipt.push({
      append:
        'Date:' +
        orderDate +
        '                    Time:' +
        orderTime +
        '\n' +
        '------------------------------------------------\n' +
        '\n'
    })
    // threeInchReceipt.push({ appendEmphasis: 'SALE\n' })

    // Only works for certain printers, check the StarSDK command compatiblity chart
    threeInchReceipt.push({ appendHorizontalTabPosition: [15, 40] })
    // threeInchReceipt.push({ append: '\n*Tab Position:\t15, \t40*\n' })
    threeInchReceipt.push({ append: 'Item\tQty.\tTotal\n' })
    items.forEach((element) => {
      const itemName = this.wordWrap(element.title, 25)
      threeInchReceipt.push({
        append:
          itemName +
          '\t' +
          element.quantity +
          '\t$' +
          parseFloat(element.total).toFixed(2) +
          '\n'
      })
    })

    threeInchReceipt.push({ appendHorizontalTabPosition: [] }) // Clear the horizontal tab postion

    threeInchReceipt.push({ appendLineFeed: 1 })
    threeInchReceipt.push({ appendHorizontalTabPosition: [40] })
    threeInchReceipt.push({
      append: 'Subtotal\t$' + parseFloat(order.sub_total).toFixed(2) + '\n'
    })
    threeInchReceipt.push({
      append: 'Tax\t$' + parseFloat(order.tax_total).toFixed(2) + '\n'
    })
    threeInchReceipt.push({
      append: 'Gratuity\t$' + parseFloat(order.grat_total).toFixed(2) + '\n'
    })
    if (order.type === 'Delivery') {
      threeInchReceipt.push({
        append:
          'Service Charges\t$' +
          parseFloat(order.delivery_charge).toFixed(2) +
          '\n'
      })
    }

    threeInchReceipt.push({
      append: '---------------------------------------------\n'
    })

    threeInchReceipt.push({ appendHorizontalTabPosition: [] }) // Clear the horizontal tab postion

    threeInchReceipt.push({ append: 'Total                       ' })
    threeInchReceipt.push({
      appendMultiple: '   $' + parseFloat(order.total).toFixed(2) + '\n',
      width: 2,
      height: 2
    })
    threeInchReceipt.push({
      append: '---------------------------------------------\n'
    })
    // threeInchReceipt.push({
    //   append:
    //     '------------------------------------------------\n' +
    //     '\n' +
    //     'Charge\n' +
    //     '156.95\n' +
    //     'Visa XXXX-XXXX-XXXX-0123\n' +
    //     '\n'
    // })
    threeInchReceipt.push({ appendInvert: 'Refunds and Exchanges\n' })
    threeInchReceipt.push({ append: 'Within ' })
    threeInchReceipt.push({ appendUnderline: '30 days' })
    threeInchReceipt.push({ append: ' with receipt\n' })
    threeInchReceipt.push({
      append: 'And tags attached\n' + '\n'
    })
    threeInchReceipt.push({
      appendAlignment: this.starprnt.AlignmentPosition.Center
    })
    if (qrCode) {
      // print QRCode
      threeInchReceipt.push({
        appendQrCode: '{BStar',
        QrCodeModel: 'No2',
        QrCodeLevel: 'L',
        cell: 8
      })
    } else {
      // print normal Barcode
      threeInchReceipt.push({
        appendBarcode: '{BStar.',
        BarcodeSymbology: this.starprnt.BarcodeSymbology.Code128,
        BarcodeWidth: this.starprnt.BarcodeWidth.Mode2,
        height: 40,
        hri: true
      })
      threeInchReceipt.push({ appendLineFeed: 2 })
    }
    threeInchReceipt.push({
      appendCutPaper: this.starprnt.CutPaperAction.PartialCutWithFeed
    })
    return threeInchReceipt
  }
  test(order) {
    // const uri = 'https://app-menucloud-io.web.app/nuxt/img/mc-logo-fill.01fe8f3.png'



    const threeInchReceipt: CommandsArray = []

    // threeInchReceipt.push({ appendCodePage: 'CP858' })
    // threeInchReceipt.push({ appendBitmap: uri, diffusion: true, width: 576, bothScale: true })



    threeInchReceipt.push({ appendInternational: 'UK' })
    threeInchReceipt.push({ appendCharacterSpace: 0 })
    threeInchReceipt.push({ appendAlignment: 'Center' })
    threeInchReceipt.push({
      append:
        'Star Clothing Boutique\n' +
        '123 Star Road\n' +
        'City, State 12345\n' +
        '\n'
    })
    threeInchReceipt.push({ appendAlignment: 'Left' })
    threeInchReceipt.push({
      append:
        'Date:MM/DD/YYYY                    Time:HH:MM PM\n' +
        '------------------------------------------------\n' +
        '\n'
    })
    threeInchReceipt.push({ appendEmphasis: 'SALE\n' })
    // cancel Emphasis


    threeInchReceipt.push({
      appendRaw:
        'SKU               Description              Total\n' +
        '300678566         PLAIN T-SHIRT            10.99\n' +
        '300692003         BLACK DENIM              29.99\n' +
        '300651148         BLUE DENIM               29.99\n' +
        '300642980         STRIPED DRESS            49.99\n' +
        '300638471         BLACK BOOTS              35.99\n' +
        '\n' +
        'Subtotal                                  156.95\n' +
        'Tax                                         0.00\n' +
        '------------------------------------------------\n'
    })


    threeInchReceipt.push({
      append:
        '------------------------------------------------\n' +
        '\n' +
        'Charge\n' +
        '156.95\n' +
        'Visa XXXX-XXXX-XXXX-0123\n' +
        '\n'
    })
    threeInchReceipt.push({ appendInvert: 'Refunds and Exchanges\n' })
    threeInchReceipt.push({ append: 'Within ' })
    threeInchReceipt.push({ appendUnderline: '30 days' })
    threeInchReceipt.push({ append: ' with receipt\n' })
    threeInchReceipt.push({
      append: 'And tags attached\n' + '\n'
    })
    threeInchReceipt.push({
      appendAlignment: 'Center'
    })

    threeInchReceipt.push({ appendLineFeed: 2 })
    threeInchReceipt.push({
      appendCutPaper: this.starprnt.CutPaperAction.PartialCutWithFeed
    })

    return threeInchReceipt
  }

  htmlReceipt(order, isKitchen?: boolean) {
    let restaurantAddress = order.restaurant.formatted_address.replace(
      '↵',
      '\\n'
    )
    restaurantAddress = restaurantAddress.replace(/\s+/g, ' ').trim()
    const orderTimeOrg = order.order_time.seconds
    // const timeStamp = order.order_time.toDate()
    const timeStamp = order.order_time.seconds * 1000

    const orderDate = moment(timeStamp).format('MMM DD, YYYY')
    const orderTime = moment(orderTimeOrg).format('hh:mm A')

    const createdTimeSec = order.created_at.seconds
    const createdTimestamp = order.created_at.seconds * 1000
    const createdDate = moment(createdTimestamp).format(
      'MMM DD, YYYY'
    )
    const createdTime = moment(createdTimeSec).format('hh:mm A')

    const items = order.cart
    const ref = order.id.replace('ordr_', '')
    const currentTime = new Date().getTime()
    let receipt = ''
    // tslint:disable-next-line:max-line-length
    receipt += '<div style="width:100%;text-align:center;"><img width="150" src="assets/un-logo.png?v=' + currentTime + '"></div>'

    if (!isKitchen) {
      receipt += '<div style="text-align:center"><span style="font-size:23px; font-weight:bold">' + order.restaurant.business_name + '</span></div>'
      receipt += '<div style="text-align:center"><span style="font-size:19px; ">' + this.wordWrap(restaurantAddress, 25, 1) + '</span></div>'
    }
    // tslint:disable-next-line:max-line-length
    receipt += '<div style=" width:100%"></div><h3 style="font-size:23px;background:#000;color:#fff; padding:5px;text-align:center; ">' + order.type.toUpperCase() + '</h3></div>'
    // tslint:disable-next-line:max-line-length
    receipt += '<div style=" width:100%; padding-right:5px"><span style="font-size:21px;font-weight:bold;"> Scheduled :</span><span style="width:33%;font-size:20px;"> ' + orderDate + '</span><span style="float:right;font-size:20px;"> ' + orderTime + '</span></div>'
    // tslint:disable-next-line:max-line-length
    receipt += '<div><p style="margin:0px;font-weight:400;color:#000"> ' + order.customer.name.first + ' ' + order.customer.name.last + '</p>'

    if (!isKitchen) {
      receipt += '<p style = "margin:0px;font-weight:400;color:#000" > ' + this.formatPhoneNumber(order.customer.phone) + ' < /p>'
      if (order.type === 'Delivery') {
        receipt += '<p style="margin:0px;font-weight:400;color:#000"> ' + order.delivery_address.replace('↵', ', ') + '</p>'
      }
    }

    receipt += '</div>'
    receipt += '<div style="text-align:center; font-size:19px;margin-top:10px;">' + 'Order Ref: ' + ref + '</div>'
    receipt += '<div style="text-align:center;font-size:17px;margin-bottom:5px;">' + 'Ordered At: ' + createdDate + ' ' + createdTime + '</div>'
    receipt += '<div style="font-weight:bold; font-size:20px; width:100%;">  ----------------------------------------------- </div>'

    receipt += this.printItems(items)

    receipt += '<div style="clear:both"></div>'
    receipt += '<div style="font-weight:bold; font-size:20px; width:100%;">  ----------------------------------------------- </div>'

    if (!isKitchen) {
      receipt +=
        '<div style="font-weight:400;color:#000;line-height:10px;margin-top:5px;"><p style="font-weight:400; font-size:18px; width:100%;height:30px;margin:0px;color:#000;"><span style="float:left">Subtotal</span><span style="float:right">$' +
        parseFloat(order.sub_total).toFixed(2) +
        '</span></p>'
      receipt +=
        '<p style="font-weight:400; font-size:18px; width:100%;height:30px;margin:0px;color:#000;"><span style="float:left;">Tax</span><span style="float:right">$' +
        parseFloat(order.tax_total).toFixed(2) +
        '</span></p>'
      receipt +=
        '<p style="font-weight:400; font-size:18px; width:100%;height:30px;margin:0px;color:#000;"><span style="float:left">Gratuity</span><span style="float:right">$' +
        parseFloat(order.grat_total).toFixed(2) +
        '</span></p>'
      if (order.type === 'Delivery') {
        receipt +=
          '<p style="font-weight:400; font-size:19px; width:100%;height:30px;margin:0px;color:#000;"><span style="float:left">Service Charges</span><span style="float:right">$' +
          parseFloat(order.delivery_charge).toFixed(2) +
          '</span></p>'
      }
      // receipt += '--------------------------------------\n'
      receipt +=
        // tslint:disable-next-line:max-line-length
        '<p style="font-weight:bold;font-size:21px; width:100%;height:25px;margin:0px;color:#000;"><span style="float:left">Total</span><span style="float:right">' +
        parseFloat(order.total).toFixed(2) +
        '</span></p></div>'
    } else {

      receipt += this.getConsolidatedList(items);
    }
    // receipt += '--------------------------------------\n'
    // receipt += '<div style="font-weight:bold; font-size:20px; width:100%;">  ----------------------------------------------- </div>'
    // tslint:disable-next-line:max-line-length
    receipt += '<div style="width:100%;text-align:center;margin:0px; color:#000"><img width="120" src="assets/logo-main.png?v=' + currentTime + '"></div>'
    receipt += '<div style="font-weight:400; font-size:17px; width:100%;text-align:center;">Powered by <span style="font-size:17px;font-weight:700;margin-bottom:20px">menuCLOUD</span></div>'
    // receipt += '<span style="font-size:24px; font-weight:bold">----------------------------------------------------------</span>'
    return receipt
  }

  printItems(items) {
    let receipt = ''
    items.forEach((item) => {
      let itemName = this.wordWrap(item.title, 25)
      if (itemName.length < 25) {
        itemName = itemName + ' '.repeat(24 - itemName.length)
      }
      receipt += '<div style="width:100%;margin-bottom:2px"><p style="margin:0px;font-weight:400;color:#000;height:25px;width:100%"><span style="float:left">&nbsp;' +
        item.quantity +
        'x ' +
        itemName +
        '</span>'

      receipt += '<span style = "float:right" > $' +
        parseFloat(item.total).toFixed(2) +
        '</span>'

      receipt += '</p>'
      if (item.order_selections.length) {
        const subItems = item.order_selections
        subItems.forEach((subItem) => {
          if (subItem.selections.length) {
            const toppings = subItem.selections
            toppings.forEach((topping) => {
              if (topping.quantity) {
                let toppingName = this.wordWrap(topping.label, 25, 1)
                if (toppingName.length < 25) {
                  toppingName =
                    toppingName + ' '.repeat(21 - toppingName.length)
                }
                const price =
                  topping.price !== ''
                    ? '<span style="float:right">$' + parseFloat(topping.price).toFixed(2) + '</span>'
                    : ''

                receipt +=
                  // tslint:disable-next-line:max-line-length
                  '<p style="margin:0px;font-weight:400;color:#000;height:20px;width:100%"><span style="float-left">&nbsp;&nbsp;&nbsp;' + topping.quantity + 'x ' + toppingName + '</span>' + price + '</p>'
              }
            })
          }
        })
      }
      receipt += '</div>'
    })
    return receipt
  }

  getConsolidatedList(items) {
    let receipt = ''
    receipt += ''
    // logic for consolidated receipt

    return receipt
  }
}
