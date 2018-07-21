const resolveItemFromCollection = (collection) => async (_, { id }) => {
  const data = await collection.query({ where: { id } }).fetchOne()
  if (data == null) {
    return null
  }
  return data.toJSON({ shallow: true })
}

const resolvePageFromCollection = (collection) => async (_, { first, skip }) => {
  const data = await collection.fetchPage({ limit: first, offset: skip })
  if (data == null) {
    return []
  }
  return data.toJSON({ shallow: true })
}

const resolveRelatedItem = (collection, table) => async ({ id }) => {
  const model = await collection.query({ where: { id } }).fetchOne()
  const data = await model.related(table).fetch()
  if (data == null) {
    return null
  }
  return data.toJSON({ shallow: true })
}

const resolveCreateMutation = (collection) => async (_, { input }) => {
  const model = await collection.create(input)
  return model.toJSON({ shallow: true })
}

const resolveUpdateMutation = (collection) => async (_, { input }) => {
  const { id } = input
  const model = await collection.query({ where: { id } }).fetchOne()
  await model.save(input)
  return model.toJSON({ shallow: true })
}

const resolveDestroyMutation = (collection) => async (_, { input }) => {
  const { id } = input
  const model = await collection.query({ where: { id } }).fetchOne()
  await model.destroy()
  return null
}

module.exports = {
  resolveItemFromCollection,
  resolvePageFromCollection,
  resolveRelatedItem,
  resolveCreateMutation,
  resolveUpdateMutation,
  resolveDestroyMutation
}
