import React, { useState } from 'react'
import PageTable from './Table'

const data = [
  {
    key: '1',
    username: 'username桌面名称1',
    contact: 'contactspecs1',
    code: 'code1',
    specs: 'specs王尼玛',
  },
  {
    key: '2',
    username: '桌面名称2',
    contact: 'specs2',
    code: '运行',
    specs: '王尼玛1',
  },
  {
    key: '3',
    username: '桌面名称3',
    contact: 'specs3',
    code: '已关机',
    specs: '鲁智深',
  },
  {
    key: '4',
    username: '桌面名称4',
    contact: 'specs4',
    code: '已关机',
    specs: '苗人凤',
  },
  {
    key: '5',
    username: '桌面名称5',
    contact: 'specs5',
    code: '运行',
    specs: '叮当猫',
  },
]

const columnList = [
  { title: '用户名称', key: 'username', width: '20%' },
  { title: '联系方式', key: 'contact', width: '20%' },
  { title: '员工编码', key: 'code', width: '20%' },
  { title: '规格', key: 'specs', width: '20%' },
]

const GroupManage = () => {
  const [pageNo, setPageNo] = useState(1)
  

  // 获取表格页码
  const getPageNo = pageNo => {
    setPageNo(pageNo)
  }

  const renderAction = () => {

  }

  return (
    <div>
      {[0, 1, 2].map(i => {
        return (
              <PageTable
                data={data}
                columnList={columnList}
                renderAction={renderAction}
                getPageNo={getPageNo}
                pageNo={pageNo}
                scroll
                showTotal
                showQuickJumper
              />
        )
      })}
    </div>
  )
}

export default GroupManage
