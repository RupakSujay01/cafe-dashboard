const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function clean() {
  console.log('Cleaning mock orders...')
  const mockOrderIds = ['T4', 'T12', 'TO1', 'T8']
  for (const id of mockOrderIds) {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) console.error(`Error deleting order ${id}:`, error)
    else console.log(`Deleted order ${id}`)
  }

  console.log('Cleaning mock tables...')
  const mockTableIds = ['T2', 'T7', 'T5', 'T9']
  for (const id of mockTableIds) {
    const { error } = await supabase.from('tables').delete().eq('id', id)
    if (error) console.error(`Error deleting table ${id}:`, error)
    else console.log(`Deleted table ${id}`)
  }

  console.log('Done!')
}

clean()
