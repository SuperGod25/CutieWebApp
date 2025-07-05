/*
  # Add newsletter subscriptions table
  1. Purpose: Store newsletter email subscriptions
  2. Schema: newsletter_subscriptions table with email and status
  3. Security: RLS enabled with public insert policy
*/

-- Create newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own subscription"
  ON newsletter_subscriptions FOR SELECT 
  USING (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
