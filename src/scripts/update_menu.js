const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateMenu() {
  console.log('Clearing existing menu items...')
  const { error: deleteError } = await supabase.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteError) console.error('Error clearing menu:', deleteError)

  console.log('Inserting new menu items...')
  const items = [
    { category: "COFFEE BAR", name: "Espresso", price: "₹100", status: "Available" },
    { category: "COFFEE BAR", name: "Cortado", price: "₹150", status: "Available" },
    { category: "COFFEE BAR", name: "Classic Cappuccino", price: "₹160", status: "Available" },
    { category: "COFFEE BAR", name: "Café Latte", price: "₹170", status: "Available" },
    { category: "COFFEE BAR", name: "Vanilla • Hazelnut • Caramel Velvet", price: "+₹30", status: "Available" },
    { category: "CRAFTED BREWS", name: "Classic Iced Americano", price: "₹140", status: "Available" },
    { category: "CRAFTED BREWS", name: "Vietnamese Velvet Brew", price: "₹180", status: "Available" },
    { category: "CRAFTED BREWS", name: "Citrus Mint Shaker", price: "₹170", status: "Available" },
    { category: "CRAFTED BREWS", name: "Iced Peach Orchard Tea", price: "₹160", status: "Available" },
    { category: "BAKERY COUNTER", name: "Butter Croissant", price: "₹140", status: "Available" },
    { category: "BAKERY COUNTER", name: "Chocolate Croissant", price: "₹170", status: "Available" },
    { category: "BAKERY COUNTER", name: "Classic Glazed Donut", price: "₹110", status: "Available" },
    { category: "BAKERY COUNTER", name: "Warm Banana Bread Slice", price: "₹130", status: "Available" },
    { category: "TOASTED PLATES", name: "Avocado Toast", price: "₹320", status: "Available" },
    { category: "TOASTED PLATES", name: "Pesto Tomato Melt", price: "₹280", status: "Available" },
    { category: "TOASTED PLATES", name: "Garlic Mushroom Toast", price: "₹290", status: "Available" },
    { category: "HOUSE PAIRINGS", name: "The Quick Fix", price: "₹220", status: "Available" },
    { category: "HOUSE PAIRINGS", name: "The Brunch Pair", price: "₹440", status: "Available" }
  ];

  const { error: insertError } = await supabase.from('menu_items').insert(items)
  if (insertError) console.error('Error inserting menu items:', insertError)
  else console.log('Successfully inserted menu items!')

  console.log('Done!')
}

updateMenu()
