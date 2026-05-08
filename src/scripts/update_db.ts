import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function update() {
  console.log('Updating menu items...')
  const items = [
    { name: 'Espresso', price: '₹120' },
    { name: 'Cortado', price: '₹180' },
    { name: 'Oat Milk Latte', price: '₹250' },
    { name: 'Pour Over (Ethiopia)', price: '₹280' },
    { name: 'Almond Croissant', price: '₹190' },
    { name: 'Chocolate Babka', price: '₹220' },
    { name: 'Avocado Toast', price: '₹350' }
  ]

  for (const item of items) {
    const { error } = await supabase
      .from('menu_items')
      .update({ price: item.price })
      .eq('name', item.name)
    if (error) console.error(`Error updating ${item.name}:`, error)
    else console.log(`Updated ${item.name} to ${item.price}`)
  }

  console.log('Updating transactions...')
  const transactions = [
    { id: '10984', amount: 650.00 },
    { id: '10983', amount: 1450.00 },
    { id: '10982', amount: 420.00 },
    { id: '10981', amount: 2300.00 }
  ]

  for (const tx of transactions) {
    const { error } = await supabase
      .from('transactions')
      .update({ amount: tx.amount })
      .eq('id', tx.id)
    if (error) console.error(`Error updating TX-${tx.id}:`, error)
    else console.log(`Updated TX-${tx.id} to ${tx.amount}`)
  }

  console.log('Done!')
}

update()
