'use strict'
import moment from 'moment'
export function sortInvoices(a, b) {

    let A = a.updatedAt
    let B = b.updatedAt


    if (moment(A).isAfter(B))return -1
    if (moment(B).isAfter(A))return 1

    return 0

}