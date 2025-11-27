/*
  # Calcutta d'Rasoi Orders and Bookings System

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `mode` (text) - 'restaurant' or 'cafe'
      - `item_name` (text) - name of the ordered item
      - `quantity` (integer) - number of items
      - `price` (numeric) - price per item
      - `total_amount` (numeric) - total order amount
      - `customer_name` (text) - customer's name
      - `customer_phone` (text) - customer's phone number
      - `delivery_address` (text) - delivery address
      - `status` (text) - order status, default 'pending'
      - `created_at` (timestamptz) - order timestamp
    
    - `table_bookings`
      - `id` (uuid, primary key)
      - `customer_name` (text) - customer's name
      - `customer_phone` (text) - customer's phone number
      - `customer_email` (text) - customer's email
      - `booking_date` (date) - reservation date
      - `booking_time` (text) - reservation time
      - `number_of_guests` (integer) - number of guests
      - `status` (text) - booking status, default 'pending'
      - `created_at` (timestamptz) - booking timestamp
    
    - `contact_inquiries`
      - `id` (uuid, primary key)
      - `customer_name` (text) - customer's name
      - `customer_email` (text) - customer's email
      - `subject` (text) - inquiry subject
      - `message` (text) - inquiry message
      - `status` (text) - inquiry status, default 'new'
      - `created_at` (timestamptz) - inquiry timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for inserting data (public access for customer submissions)
    - Add policies for reading data (authenticated access only)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mode text NOT NULL CHECK (mode IN ('restaurant', 'cafe')),
  item_name text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  total_amount numeric(10, 2) NOT NULL CHECK (total_amount >= 0),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS table_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  number_of_guests integer NOT NULL CHECK (number_of_guests > 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can create bookings"
  ON table_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can create inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view bookings"
  ON table_bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);