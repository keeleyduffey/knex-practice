// const ShoppingListService = require('../src/shopping-list-service')
// const knex = require('knex')

// describe(`Items service object`, function() {
// 	let db
// 	let testItems = [
//     {
//     	id: 1,
//       name: 'First test post!',
//       price: 2.50,
//       checked: false,
//       category: 'Breakfast',
//       date_added: new Date('2029-01-22T16:28:32.615Z')
//     },
//     {
//     	id: 2,
//       name: 'Second test post!',
//       price: 2.50,
//       checked: false,
//       category: 'Lunch',
//     	date_added: new Date('2100-05-22T16:28:32.615Z')
//     },
//     {
//     	id: 3,
//       name: 'Third test post!',
//       price: 2.50,
//       checked: false,
//       category: 'Dinner',
//     	date_added: new Date('1919-12-22T16:28:32.615Z')
//     },
//   ]

//   before(() => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL,
//     })
//   })

// 	after(() => db.destroy())

// 	before(() => db('shopping_list').truncate())

// 	afterEach(() => db('shopping_list').truncate())

// 	context(`Given 'shopping_list' has data`, () => {
// 	  beforeEach(() => {
// 	    return db
// 	      .into('shopping_list')
// 	      .insert(testItems)
// 	  })
  	
//   	it(`getAllListItems() resolves all items from 'shopping_list' table`, () => {
// 	    return ShoppingListService.getAllListItems(db)
// 	      expect(actual).to.eql(testItems.map(item => ({
//           ...item,
//           date_added: new Date(item.date_added)
//         })))
//   	})

//   	it(`getById() resolves an item by id from 'shopping_list' table`, () => {
// 	    const thirdId = 3
// 	    const thirdTestItem = testItems[thirdId - 1]
// 	    return ShoppingListService.getById(db, thirdId)
// 	      .then(actual => {
// 	        expect(actual).to.eql({
// 	          id: thirdId,
// 	          name: thirdTestItem.name,
// 	          price: thirdTestItem.price,
// 	          checked: false,
// 	          category: thirdTestItem.category,
// 	          date_added: thirdTestItem.date_added,
// 	        })
// 	      })
// 	  })

// 	  it(`deleteListItem() removes an item by id from 'shopping_list' table`, () => {
// 	    const itemId = 3
// 	    return ShoppingListService.deleteListItem(db, itemId)
// 	      .then(() => ShoppingListService.getAllListItems(db))
// 	      .then(allItems => {
// 	        const expected = testItems.filter(item => item.id !== itemId)
// 	        expect(allItems).to.eql(expected)
// 	      })
// 	  })

// 	  it(`updateListItem() updates an item from the 'shopping_list' table`, () => {
// 	    const idOfItemToUpdate = 3
// 	    const newItemData = {
// 	      name: 'updated name',
// 	      price: 2.50,
// 	      checked: true,
// 	      category: 'updated category',
// 	      date_added: new Date(),
// 	    }
// 	    return ShoppingListService.updateListItem(db, idOfItemToUpdate, newItemData)
// 	      .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
// 	      .then(item => {
// 	        expect(item).to.eql({
// 	          id: idOfItemToUpdate,
// 	          ...newItemData,
// 	        })
// 	      })
// 	  })
//   })

//   context(`Given 'shopping_list' has no data`, () => {
// 	  it(`getAllListItems() resolves an empty array`, () => {
// 	    return ShoppingListService.getAllListItems(db)
// 	      .then(actual => {
// 	        expect(actual).to.eql([])
// 	      })
// 	  })

// 	  it(`insertListItem() inserts an item and resolves the item with an 'id'`, () => {
// 		  const newItem = {
// 		    name: 'new name',
// 	      price: 2.50,
// 	      checked: true,
// 	      category: 'new category',
// 	      date_added: new Date('2020-01-01T00:00:00.000Z'),
// 		  }
// 		  return ShoppingListService.insertListItem(db, newItem)
// 		  	.then(actual => {
// 		      expect(actual).to.eql({
// 		        id: 1,
// 		        name: newItem.name,
//             price: newItem.price,
//             checked: newItem.checked,
//             category: newItem.category,
// 			      date_added: new Date(newItem.date_added),
// 		      })
// 		    })
//  		})
// 	})
// })
const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List Service object`, function () {
  let db
  let testItems = [
    {
    	id: 1,
      name: 'First test post!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '2.50',
      category: 'Breakfast'
      
    },
    {
    	id: 2,
      name: 'Second test post!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '2.50',
      category: 'Lunch',
    },
    {
    	id: 3,
      name: 'Third test post!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '2.50',
      category: 'Snack'
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it(`getAllListItems() resolves all items from 'shopping_list' table`, () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }))
      return ShoppingListService.getAllListItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems)
        })
    })

    it(`getById() resolves an article by id from 'shopping_list' table`, () => {
      const thirdItemId = 3
      const thirdItem = testItems[thirdItemId - 1]
      return ShoppingListService.getById(db, thirdItemId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdItemId,
            name: thirdItem.name,
            date_added: thirdItem.date_added,
            price: thirdItem.price,
            category: thirdItem.category,
            checked: false,
          })
        })
    })

    it(`deleteListItem() removes an article by id from 'shopping_list' table`, () => {
      const articleId = 3
      return ShoppingListService.deleteListItem(db, articleId)
        .then(() => ShoppingListService.getAllListItems(db))
        .then(allItems => {
          // copy the test items array without the removed article
          const expected = testItems
            .filter(article => article.id !== articleId)
            .map(item => ({
              ...item,
              checked: false,
            }))
          expect(allItems).to.eql(expected)
        })
    })

    it(`updateListItem() updates an article from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3
      const newItemData = {
        name: 'updated title',
        price: '5.95',
        date_added: new Date(),
        checked: true,
      }
      const originalItem = testItems[idOfItemToUpdate - 1]
      return ShoppingListService.updateListItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(article => {
          expect(article).to.eql({
            id: idOfItemToUpdate,
            ...originalItem,
            ...newItemData,
          })
        })
    })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllListItems() resolves an empty array`, () => {
      return ShoppingListService.getAllListItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it(`insertListItem() inserts an article and resolves the article with an 'id'`, () => {
      const newItem = {
        name: 'Test new name',
        price: '4.50',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        checked: true,
        category: 'Lunch',
      }
      return ShoppingListService.insertListItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            checked: newItem.checked,
            category: newItem.category,
          })
        })
    })
  })
})