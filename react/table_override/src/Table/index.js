import React from 'react'
import { Table } from 'antd'
import { setColumns } from './columns'

const PageTable = ({
  total = 50,
  pageNo = 1,
  pageSize = 15,
  data,
  columnList,
  getPageNo,
  renderAction,
  rowSelection,
  showTotal,
  customShowTotal,
  size,
  scroll,
  showQuickJumper,
}) => {
  const needShowTotal = allCount => (
    <div className="f12 c-xd-gray">
      共{allCount}条记录 第{pageNo}/{Math.ceil(total / 10)}页
    </div>
  )

  const onChangePage = pageNo => {
    getPageNo(pageNo)
  }

  return (
    <Table
      rowKey={record => record.key}
      rowSelection={rowSelection || null}
      columns={setColumns(columnList, renderAction)}
      dataSource={data}
      scroll={scroll ? { x: 'calc(700px + 50%)' } : false}
      size={size || 'default'}
      pagination={{
        showQuickJumper,
        hideOnSinglePage: true,
        total,
        current: pageNo,
        pageSize,
        showTotal: showTotal ? customShowTotal || needShowTotal : undefined,
        onChange: e => onChangePage(e),
      }}
    />
  )
}

export default PageTable
