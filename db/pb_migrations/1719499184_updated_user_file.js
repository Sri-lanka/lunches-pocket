/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvoraxb6ymu5euq")

  collection.name = "user_sheet"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvoraxb6ymu5euq")

  collection.name = "user_file"

  return dao.saveCollection(collection)
})
