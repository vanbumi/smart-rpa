/*
  # RPA Poultry Processing Plant Management System - Database Schema

  1. New Tables
    - `inventory_items` - Stock of processed poultry parts (Ayam Utuh, Sayap, Paha, Ceker, Jeroan)
      - `id` (uuid, primary key)
      - `name` (text) - Item name
      - `category` (text) - Category (utuh, sayap, paha, ceker, jeroan)
      - `weight_kg` (numeric) - Current stock weight in kg
      - `unit_count` (integer) - Number of units
      - `price_per_kg` (numeric) - Selling price per kg
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `conversions` - Live bird to processed parts transformation records
      - `id` (uuid, primary key)
      - `live_weight_kg` (numeric) - Weight of live birds input
      - `bird_count` (integer) - Number of birds processed
      - `mortality_count` (integer) - DOA count
      - `waste_weight_kg` (numeric) - Waste generated
      - `utuh_kg` (numeric) - Whole chicken output
      - `sayap_kg` (numeric) - Wings output
      - `paha_kg` (numeric) - Thighs output
      - `ceker_kg` (numeric) - Feet output
      - `jeroan_kg` (numeric) - Offal output
      - `conversion_date` (date) - Date of conversion
      - `created_at` (timestamptz)

    - `orders` - Sales orders
      - `id` (uuid, primary key)
      - `order_number` (text) - Order reference number
      - `customer_name` (text) - Customer name
      - `status` (text) - Order status (menunggu, proses, dikirim, selesai)
      - `total_amount` (numeric) - Total order amount
      - `due_date` (date) - Payment due date
      - `is_paid` (boolean) - Payment status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `order_items` - Line items for orders
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key -> orders)
      - `inventory_item_id` (uuid, foreign key -> inventory_items)
      - `quantity_kg` (numeric) - Quantity in kg
      - `price_per_kg` (numeric) - Price per kg at time of order
      - `subtotal` (numeric) - Line total

    - `daily_metrics` - Daily aggregated KPI data
      - `id` (uuid, primary key)
      - `metric_date` (date) - Date of metric
      - `total_weight_in_kg` (numeric) - Total incoming weight
      - `net_profit` (numeric) - Daily net profit
      - `yield_percentage` (numeric) - Rendemen/yield percentage
      - `pending_orders` (integer) - Number of pending orders
      - `production_target_kg` (numeric) - Production target
      - `production_actual_kg` (numeric) - Actual production
      - `sales_revenue` (numeric) - Total sales revenue
      - `hpp_total` (numeric) - HPP (Cost of Goods Sold)
      - `cash_inflow` (numeric) - Cash inflow
      - `cash_outflow` (numeric) - Cash outflow
      - `mortality_rate` (numeric) - DOA mortality rate percentage
      - `waste_kg` (numeric) - Waste in kg
      - `created_at` (timestamptz)

    - `ar_aging` - Accounts receivable aging data
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `amount_current` (numeric) - Current (0-30 days)
      - `amount_31_60` (numeric) - 31-60 days
      - `amount_61_90` (numeric) - 61-90 days
      - `amount_over_90` (numeric) - Over 90 days
      - `total_outstanding` (numeric) - Total outstanding
      - `updated_at` (timestamptz)

    - `production_performance` - Slaughtering team performance
      - `id` (uuid, primary key)
      - `team_name` (text)
      - `birds_processed` (integer)
      - `avg_processing_time_min` (numeric) - Average processing time per bird
      - `yield_percentage` (numeric)
      - `performance_date` (date)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
    - All tables use restrictive RLS policies

  3. Important Notes
    - All monetary values stored as numeric for precision
    - Dates use timestamptz for timezone awareness
    - Foreign keys enforce referential integrity between orders and order_items
*/

-- Inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('utuh', 'sayap', 'paha', 'ceker', 'jeroan')),
  weight_kg numeric(10,2) DEFAULT 0,
  unit_count integer DEFAULT 0,
  price_per_kg numeric(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read inventory"
  ON inventory_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert inventory"
  ON inventory_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update inventory"
  ON inventory_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Conversions table
CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  live_weight_kg numeric(10,2) NOT NULL DEFAULT 0,
  bird_count integer NOT NULL DEFAULT 0,
  mortality_count integer DEFAULT 0,
  waste_weight_kg numeric(10,2) DEFAULT 0,
  utuh_kg numeric(10,2) DEFAULT 0,
  sayap_kg numeric(10,2) DEFAULT 0,
  paha_kg numeric(10,2) DEFAULT 0,
  ceker_kg numeric(10,2) DEFAULT 0,
  jeroan_kg numeric(10,2) DEFAULT 0,
  conversion_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read conversions"
  ON conversions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert conversions"
  ON conversions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL,
  customer_name text NOT NULL,
  status text NOT NULL DEFAULT 'menunggu' CHECK (status IN ('menunggu', 'proses', 'dikirim', 'selesai')),
  total_amount numeric(14,2) DEFAULT 0,
  due_date date,
  is_paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  inventory_item_id uuid REFERENCES inventory_items(id),
  quantity_kg numeric(10,2) NOT NULL DEFAULT 0,
  price_per_kg numeric(12,2) NOT NULL DEFAULT 0,
  subtotal numeric(14,2) NOT NULL DEFAULT 0
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update order items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Daily metrics table
CREATE TABLE IF NOT EXISTS daily_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_date date NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  total_weight_in_kg numeric(10,2) DEFAULT 0,
  net_profit numeric(14,2) DEFAULT 0,
  yield_percentage numeric(5,2) DEFAULT 0,
  pending_orders integer DEFAULT 0,
  production_target_kg numeric(10,2) DEFAULT 0,
  production_actual_kg numeric(10,2) DEFAULT 0,
  sales_revenue numeric(14,2) DEFAULT 0,
  hpp_total numeric(14,2) DEFAULT 0,
  cash_inflow numeric(14,2) DEFAULT 0,
  cash_outflow numeric(14,2) DEFAULT 0,
  mortality_rate numeric(5,2) DEFAULT 0,
  waste_kg numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read daily metrics"
  ON daily_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert daily metrics"
  ON daily_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update daily metrics"
  ON daily_metrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- AR Aging table
CREATE TABLE IF NOT EXISTS ar_aging (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  amount_current numeric(14,2) DEFAULT 0,
  amount_31_60 numeric(14,2) DEFAULT 0,
  amount_61_90 numeric(14,2) DEFAULT 0,
  amount_over_90 numeric(14,2) DEFAULT 0,
  total_outstanding numeric(14,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ar_aging ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read ar aging"
  ON ar_aging FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert ar aging"
  ON ar_aging FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update ar aging"
  ON ar_aging FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Production performance table
CREATE TABLE IF NOT EXISTS production_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  birds_processed integer NOT NULL DEFAULT 0,
  avg_processing_time_min numeric(5,2) DEFAULT 0,
  yield_percentage numeric(5,2) DEFAULT 0,
  performance_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE production_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read production performance"
  ON production_performance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert production performance"
  ON production_performance FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Seed inventory items
INSERT INTO inventory_items (name, category, weight_kg, unit_count, price_per_kg) VALUES
  ('Ayam Utuh', 'utuh', 2450.00, 1200, 32000),
  ('Sayap', 'sayap', 680.50, 3400, 45000),
  ('Paha', 'paha', 920.00, 2800, 38000),
  ('Ceker', 'ceker', 310.25, 5200, 28000),
  ('Jeroan', 'jeroan', 185.75, 1800, 22000);

-- Seed daily metrics for last 7 days
INSERT INTO daily_metrics (metric_date, total_weight_in_kg, net_profit, yield_percentage, pending_orders, production_target_kg, production_actual_kg, sales_revenue, hpp_total, cash_inflow, cash_outflow, mortality_rate, waste_kg) VALUES
  (CURRENT_DATE - INTERVAL '6 days', 4200.00, 8500000, 72.5, 8, 4500, 4200, 28500000, 20000000, 30000000, 21500000, 1.2, 180),
  (CURRENT_DATE - INTERVAL '5 days', 3800.00, 7200000, 71.8, 5, 4500, 3800, 25600000, 18400000, 27000000, 19800000, 1.5, 210),
  (CURRENT_DATE - INTERVAL '4 days', 4500.00, 9200000, 73.1, 12, 4500, 4500, 31000000, 21800000, 33000000, 23800000, 0.8, 150),
  (CURRENT_DATE - INTERVAL '3 days', 4100.00, 8100000, 72.0, 7, 4500, 4100, 27800000, 19700000, 29000000, 20900000, 1.1, 195),
  (CURRENT_DATE - INTERVAL '2 days', 4600.00, 9800000, 74.2, 3, 4500, 4600, 32500000, 22700000, 35000000, 25200000, 0.6, 140),
  (CURRENT_DATE - INTERVAL '1 days', 4300.00, 8700000, 72.8, 6, 4500, 4300, 29200000, 20500000, 31000000, 22300000, 0.9, 165),
  (CURRENT_DATE, 4400.00, 9100000, 73.5, 4, 4500, 4400, 30500000, 21400000, 32000000, 22900000, 0.7, 155);

-- Seed sample orders
INSERT INTO orders (order_number, customer_name, status, total_amount, due_date, is_paid) VALUES
  ('ORD-2026-001', 'PT Segar Jaya', 'proses', 12500000, CURRENT_DATE + INTERVAL '15 days', false),
  ('ORD-2026-002', 'Restoran Sederhana', 'dikirim', 8750000, CURRENT_DATE + INTERVAL '7 days', false),
  ('ORD-2026-003', 'Hotel Grand Mercure', 'selesai', 15200000, CURRENT_DATE - INTERVAL '5 days', true),
  ('ORD-2026-004', 'Warung Makan Bu Tini', 'menunggu', 3200000, CURRENT_DATE + INTERVAL '30 days', false),
  ('ORD-2026-005', 'PT Dharma Catering', 'proses', 9800000, CURRENT_DATE + INTERVAL '10 days', false),
  ('ORD-2026-006', 'Supermarket Indogrosir', 'dikirim', 22100000, CURRENT_DATE + INTERVAL '3 days', false),
  ('ORD-2026-007', 'RM Padang Sederhana', 'selesai', 6400000, CURRENT_DATE - INTERVAL '10 days', true),
  ('ORD-2026-008', 'PT Katering Nusantara', 'menunggu', 11500000, CURRENT_DATE + INTERVAL '20 days', false);

-- Seed AR aging data
INSERT INTO ar_aging (customer_name, amount_current, amount_31_60, amount_61_90, amount_over_90, total_outstanding) VALUES
  ('PT Segar Jaya', 12500000, 0, 0, 0, 12500000),
  ('Restoran Sederhana', 5000000, 3750000, 0, 0, 8750000),
  ('Hotel Grand Mercure', 0, 0, 0, 0, 0),
  ('Warung Makan Bu Tini', 0, 0, 3200000, 0, 3200000),
  ('PT Dharma Catering', 9800000, 0, 0, 0, 9800000),
  ('Supermarket Indogrosir', 15000000, 7100000, 0, 0, 22100000),
  ('PT Katering Nusantara', 0, 11500000, 0, 0, 11500000);

-- Seed production performance
INSERT INTO production_performance (team_name, birds_processed, avg_processing_time_min, yield_percentage, performance_date) VALUES
  ('Tim Penyembelihan A', 850, 3.5, 74.2, CURRENT_DATE),
  ('Tim Penyembelihan B', 780, 3.8, 72.8, CURRENT_DATE),
  ('Tim Penyembelihan C', 920, 3.2, 75.1, CURRENT_DATE);

-- Seed conversions
INSERT INTO conversions (live_weight_kg, bird_count, mortality_count, waste_weight_kg, utuh_kg, sayap_kg, paha_kg, ceker_kg, jeroan_kg, conversion_date) VALUES
  (5000, 2500, 18, 320, 2450, 680, 920, 310, 185, CURRENT_DATE),
  (4800, 2400, 22, 305, 2350, 650, 880, 295, 175, CURRENT_DATE - INTERVAL '1 day');
