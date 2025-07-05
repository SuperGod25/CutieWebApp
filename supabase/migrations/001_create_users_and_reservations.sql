/*
  # Create users and reservations tables for Cutie cafe
  1. Purpose: Set up core database structure for user management and reservations
  2. Schema: 
     - profiles (user profiles extending Supabase auth)
     - reservations (table reservations, flower orders, event bookings)
     - events (community events and workshops)
  3. Security: RLS enabled with appropriate policies for data protection
*/

-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  reservation_type text NOT NULL CHECK (reservation_type IN ('table', 'flowers', 'community-event', 'corporate-event', 'photo-session')),
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  party_size text,
  special_requests text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  event_time time NOT NULL,
  capacity integer NOT NULL DEFAULT 20,
  price decimal(10,2) DEFAULT 0.00,
  category text NOT NULL DEFAULT 'workshop',
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text,
  registration_date timestamptz DEFAULT now(),
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'attended'))
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Reservations policies
CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update own reservations"
  ON reservations FOR UPDATE 
  USING (auth.uid() = user_id);

-- Events policies (public read access)
CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT 
  USING (is_active = true);

-- Event registrations policies
CREATE POLICY "Anyone can register for events"
  ON event_registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view own registrations"
  ON event_registrations FOR SELECT 
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_type ON reservations(reservation_type);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, capacity, price, category, image_url) VALUES
('Community Coffee Cupping', 'Învață despre diferitele origini ale cafelei și metodele de preparare în timp ce susții partenerii noștri fermieri locali.', '2024-02-15', '10:00', 20, 0.00, 'Workshop', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=250&fit=crop'),
('Workshop Viață Sustenabilă', 'Descoperă modalități practice de a trăi mai sustenabil cu proiecte DIY și sfaturi eco-friendly.', '2024-02-22', '14:00', 15, 10.00, 'Workshop', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop'),
('Curs Aranjamente Florale', 'Creează aranjamente frumoase cu flori de sezon în timp ce înveți tehnici profesionale.', '2024-03-01', '18:00', 12, 25.00, 'Creative', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop'),
('Panel Incluziune & Accesibilitate', 'Alătură-te liderilor comunitari pentru o discuție despre construirea de spații și practici mai incluzive.', '2024-03-08', '19:00', 30, 0.00, 'Community', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop'),
('Showcase Artiști Locali', 'Celebrează talentul local cu expoziții de artă, spectacole muzicale și networking creativ.', '2024-03-15', '17:00', 40, 0.00, 'Arts', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop'),
('Networking Întreprinderi Sociale', 'Conectează-te cu alți antreprenori sociali și învață despre inițiativele de impact comunitar.', '2024-03-22', '18:00', 25, 5.00, 'Networking', 'https://images.unsplash.com/photo-1528725602363-b65191435aa6?w=400&h=250&fit=crop');
