-- Enable realtime for settings table
ALTER TABLE public.settings REPLICA IDENTITY FULL;

-- Add settings table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;