export const formatdate = (date, spe) => {
  // 在过滤器中，存在着一个前面数据的参数
  let data = new Date(date)
  // 省略符
  spe = spe || '/'
  let newDate = data.getFullYear() + spe + (data.getMonth() + 1) + spe + data.getDate()
  return newDate
}
