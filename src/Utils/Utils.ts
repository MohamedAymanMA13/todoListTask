import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import axios from 'axios'

export const exportExcel = async (endPoint: any, headers: any, name: any) => {
  try {
    const response: any = await axios.get(`${process.env.REACT_APP_API_KEY}/${endPoint}`, {
      params: { limit: 10, offset: 0, allData: true },
    })
    // let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // let data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
    /* convert from array of arrays to workbook */
    const data = response?.data?.data?.map((item: any) => {
      const head: any = []
      headers.forEach((x: any) => head.push(item[x.value]))
      // console.log(ARR_Item,'---------------------------------------------------')
      return head
    })
    const head: any = []
    headers.forEach((x: any) => x.label !== 'Actions' && head.push(x.label))
    data.unshift(head)
    const worksheet = XLSX.utils.aoa_to_sheet(data)
    const newWorkbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'SheetJS')
    XLSX.writeFile(newWorkbook, `${name}_${dayjs().format('DD-MM-YYYY')}_timestamp.xlsx`)
  } catch (error) {
    toast.error('No item for export', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}
export const test = 'test'
