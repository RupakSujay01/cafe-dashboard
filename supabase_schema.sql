-- Create Tables

-- 1. Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id text PRIMARY KEY,
  customer_name text NOT NULL,
  items text NOT NULL,
  status text NOT NULL,
  color text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tables (Reservations/Status)
CREATE TABLE IF NOT EXISTS public.tables (
  id text PRIMARY KEY,
  name text NOT NULL,
  time text NOT NULL,
  guests integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Menu Items
CREATE TABLE IF NOT EXISTS public.menu_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  name text NOT NULL,
  price text NOT NULL,
  status text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Transactions (Accounting)
CREATE TABLE IF NOT EXISTS public.transactions (
  id text PRIMARY KEY,
  time text NOT NULL,
  processed_by text NOT NULL,
  img text NOT NULL,
  amount numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Mock Data

-- Orders
INSERT INTO public.orders (id, customer_name, items, status, color) VALUES
('T4', 'Table 4', 'Espresso x2', 'Brewing', 'bg-blue-500/20 text-blue-500'),
('T12', 'Table 12', 'Pour Over', 'Waiting', 'bg-orange-500/20 text-orange-500'),
('TO1', 'Takeout (Anna)', 'Iced Latte', 'Ready', 'bg-emerald-500/20 text-emerald-500'),
('T8', 'Table 8', 'Cortado, Pastry', 'Brewing', 'bg-blue-500/20 text-blue-500');

-- Tables
INSERT INTO public.tables (id, name, time, guests) VALUES
('T2', 'Window Booth', '18:30', 2),
('T7', 'Center Large Table', '19:00', 6),
('T5', 'Corner Table', '19:15', 2),
('T9', 'Bar Seating', '20:00', 1);

-- Menu Items
INSERT INTO public.menu_items (category, name, price, status) VALUES
('Coffee', 'Espresso', '₹120', 'Available'),
('Coffee', 'Cortado', '₹180', 'Available'),
('Coffee', 'Oat Milk Latte', '₹250', 'Available'),
('Coffee', 'Pour Over (Ethiopia)', '₹280', 'Low Stock'),
('Pastries', 'Almond Croissant', '₹190', 'Available'),
('Pastries', 'Chocolate Babka', '₹220', 'Sold Out'),
('Pastries', 'Avocado Toast', '₹350', 'Available');

-- Transactions
INSERT INTO public.transactions (id, time, processed_by, img, amount) VALUES
('10984', '10:42 AM', 'Sarah L.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=60', 650.00),
('10983', '10:35 AM', 'Marcus T.', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&auto=format&fit=crop&q=60', 1450.00),
('10982', '10:15 AM', 'David K.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=60', 420.00),
('10981', '09:50 AM', 'Elena R.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&auto=format&fit=crop&q=60', 2300.00);
