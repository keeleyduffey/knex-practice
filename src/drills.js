require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
	connection: process.env.DB_URL
})

function searchByItemName(searchTerm) {
  knexInstance
    .select('id', 'name', 'price', 'checked', 'category', 'date_added')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

// searchByItemName('ham');

function paginatedItems(pageNumber) {
	const itemsPerPage = 6
  const offset = itemsPerPage * (pageNumber - 1)
  knexInstance
    .select('id', 'name', 'price', 'checked', 'category', 'date_added')
    .from('shopping_list')
		.limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

// paginatedItems(4)

function itemsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'checked', 'category', 'date_added')
    .from('shopping_list')
		.where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    })
}

// itemsAddedDaysAgo(1)


// 4. Get the total cost for each category

// A function that takes no parameters
// The function will query the shopping_list table using Knex methods and select the rows grouped by their category and showing the total price for each category.
function costByCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
		.groupBy('category')
    .then(result => {
      console.log(result)
    })
}

costByCategory();

// console.log('connection successful');
