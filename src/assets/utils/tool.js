export const dfs = (target, cb) => {
  cb = typeof cb === 'function' ? cb : () => {}
  target = Array.isArray(target) ? target : [target]

  const loop = data => {
    data.forEach(item => {
      cb(item)

      if (Array.isArray(item.children)) {
        loop(item.children)
      }
    })
  }

  loop(target)
}

export const bfs = (target, cb) => {
  cb = typeof cb === 'function' ? cb : () => {}
  target = Array.isArray(target) ? target.slice() : [target].slice()

  for (let i = 0; i < target.length; i++) {
    const cur = target[i]
    cb(cur)

    if (Array.isArray(cur.children)) {
      target = target.concat(cur.children)
    }
  }
}

export const deepClone = data => {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  const res = Array.isArray(data) ? [] : {}

  Object.keys(data).forEach(key => {
    res[key] = deepClone(data[key])
  })

  return res
}

export const list2Tree = (target, props = { id: 'id', parentId: 'parentId', children: 'children' }) => {
  const res = []
  const { id: idKey, parentId: parentIdKey, children: childrenKey } = props
  const map = new Map()

  target.forEach(item => {
    item[childrenKey] = []
    map.set(item[idKey], item)
  })

  target.forEach(item => {
    const parentItem = map.get(item[parentIdKey])
    if (parentItem) {
      parentItem[childrenKey].push(item)
    } else {
      res.push(item)
    }
  })

  return res
}

export const treeMerge = () => {}

export const findComponentUpward = (context, componentName) => {
  let parent = context?.$parent
  let name = parent?.$options?.name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    name = parent?.$options?.name
  }

  return parent
}

export const findComponentMethodUpward = (context, methodName) => {
  if (!context || !methodName) {
    return
  }

  let parent = context?.$parent
  let cb = parent?.[methodName]

  while (parent && !cb) {
    parent = parent.$parent
    cb = parent?.[methodName]
  }

  return cb
}
