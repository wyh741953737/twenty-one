import React from 'react'

const setColumns = (columnList, renderAction) => {
  // 默认渲染item方法
  const renderItem = text => (
    <div title={text} className="ellipsis">
      {text}
    </div>
  )

  const newColumns = columnList => {
    return columnList.map(i => ({
      title: i.title,
      key: i.key,
      dataIndex: i.key,
      width: i.width || null,
      render: i.render || (text => renderItem(text)),
    }))
  }

  // 生成columns
  let columns

  if (renderAction) {
    columns = [
      ...newColumns(columnList || []),
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        width: '20%',
        fixed: 'right',
        render: (text, record) => renderAction && renderAction(record),
      },
    ]
  } else {
    columns = newColumns(columnList || [])
  }

  return columns
}

export { setColumns }
