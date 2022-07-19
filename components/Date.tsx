import React from 'react'
import { parseISO, format } from 'date-fns'


const Date = ({ dateString }: any) => {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default Date