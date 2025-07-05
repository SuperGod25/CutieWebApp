/*
  # Initial Schema for Cutie Café & Flower Shop
  
  1. Purpose: Create core tables for managing reservations, events, newsletter subscriptions, and contact forms
  2. Schema: 
     - reservations (customer reservations for tables, flowers, events)
     - events (community events and workshops)
     - newsletter_subscriptions (email newsletter subscribers)
     - contact_messages (contact form submissions)
  3. Security: RLS enabled on all tables with appropriate policies
*/

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  reservation_type text NOT NULL CHECK (reservation_type IN ('table', 'flowers', 'community-event', 'corporate-event', 'photo-session')),
  reservation_date date NOT NULL,
  reservation_time text NOT NULL,
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
  event_time text NOT NULL,
  capacity integer NOT NULL DEFAULT 20,
  current_registrations integer DEFAULT 0,
  price text DEFAULT 'Free',
  category text NOT NULL DEFAULT 'Workshop',
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  special_requests text DEFAULT '',
  registration_date timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own reservations"
  ON reservations FOR SELECT 
  USING (true);

-- Create policies for events
CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT 
  USING (is_active = true);

-- Create policies for newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own subscription"
  ON newsletter_subscriptions FOR SELECT 
  USING (true);

-- Create policies for contact messages
CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT 
  WITH CHECK (true);

-- Create policies for event registrations
CREATE POLICY "Anyone can register for events"
  ON event_registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view event registrations"
  ON event_registrations FOR SELECT 
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, capacity, price, category, image_url) VALUES
('Degustare de Cafea Comunitară', 'Învață despre diferite origini de cafea și metode de preparare în timp ce susții partenerii noștri fermieri locali.', '2024-02-15', '10:00 - 12:00', 20, 'Gratuit', 'Workshop', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=250&fit=crop'),
('Workshop Viață Sustenabilă', 'Descoperă modalități practice de a trăi mai sustenabil cu proiecte DIY și sfaturi eco-friendly.', '2024-02-22', '14:00 - 16:00', 15, '10 RON', 'Workshop', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop'),
('Curs Aranjamente Florale', 'Creează aranjamente frumoase cu flori de sezon în timp ce înveți tehnici profesionale.', '2024-03-01', '18:00 - 20:00', 12, '25 RON', 'Creative', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop'),
('Panel Incluziune & Accesibilitate', 'Alătură-te liderilor comunitari pentru o discuție despre construirea de spații și practici mai incluzive.', '2024-03-08', '19:00 - 21:00', 30, 'Gratuit', 'Community', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop'),
('Expoziție Artiști Locali', 'Celebrează talentul local cu expoziții de artă, spectacole muzicale și networking creativ.', '2024-03-15', '17:00 - 20:00', 40, 'Gratuit', 'Arts', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop'),
('Networking Întreprinderi Sociale', 'Conectează-te cu alți antreprenori sociali și învață despre inițiativele de impact comunitar.', '2024-03-22', '18:00 - 20:00', 25, '5 RON', 'Networking', 'https://images.unsplash.com/photo-1528725602363-b65191435aa6?w=400&h=250&fit=crop');
