-- Add acknowledged column to orders table for tracking chef acknowledgment
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS acknowledged BOOLEAN DEFAULT false;

-- Enable realtime for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;