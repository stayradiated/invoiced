const toJSON = (data) => {
  if (data == null) {
    return null
  }
  return data.toJSON({ shallow: true })
}

const resolveItemFromCollection = (collection) => async (_, { id }) => {
  const data = await collection.query({ where: { id } }).fetchOne()
  return toJSON(data)
}

const resolvePageFromCollection = (collection) => async (_, { first, skip }) => {
  const data = await collection.fetchPage({ limit: first, offset: skip })
  return {
    items: toJSON(data),
    total: data.pagination.rowCount
  }
}

const resolveRelatedItem = (collection, table) => async ({ id }) => {
  const model = await collection.query({ where: { id } }).fetchOne()
  const data = await model.related(table).fetch()
  return toJSON(data)
}

const resolveRelatedList = (collection, table, buildQuery) => async({ id }, { first, skip }) => {
  const model = await collection.query({ where: { id } }).fetchOne()
  const data = await model.related(table).query(buildQuery).fetchPage({ limit: first, offset: skip })
  return {
    items: toJSON(data),
    total: data.pagination.rowCount
  }
}

const resolveCreateMutation = (collection) => async (_, { input }) => {
  const model = await collection.create(input)
  return model.toJSON({ shallow: true })
  return toJSON(model)
}

const resolveUpdateMutation = (collection) => async (_, { input }) => {
  const { id } = input
  const model = await collection.query({ where: { id } }).fetchOne()
  await model.save(input)
  return toJSON(model)
}

const resolveDestroyMutation = (collection) => async (_, { input }) => {
  const { id } = input
  const model = await collection.query({ where: { id } }).fetchOne()
  if (model == null) {
    return false
  }
  await model.destroy()
  return true
}

module.exports = {
  resolveItemFromCollection,
  resolvePageFromCollection,
  resolveRelatedItem,
  resolveRelatedList,
  resolveCreateMutation,
  resolveUpdateMutation,
  resolveDestroyMutation
}
