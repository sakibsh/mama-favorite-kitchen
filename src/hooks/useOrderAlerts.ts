import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  acknowledged: boolean;
  created_at: string;
}

interface UseOrderAlertsReturn {
  unacknowledgedOrders: Order[];
  acknowledgeOrder: (orderId: string) => Promise<void>;
  isAudioEnabled: boolean;
  enableAudio: () => void;
}

export function useOrderAlerts(
  orders: Order[], 
  onNewOrder?: () => void,
  onOrderUpdate?: (orderId: string, acknowledged: boolean) => void
): UseOrderAlertsReturn {
  const [unacknowledgedOrders, setUnacknowledgedOrders] = useState<Order[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousOrderCountRef = useRef<number>(0);

  // Filter unacknowledged orders from props
  useEffect(() => {
    const unacked = orders.filter(o => o.acknowledged === false);
    setUnacknowledgedOrders(unacked);
  }, [orders]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/sounds/new-order-alert.mp3');
    audioRef.current.volume = 0.8;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play alert sound for 15 seconds
  const playAlertSound = useCallback(() => {
    if (!audioRef.current || !isAudioEnabled) return;

    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
    };

    // Play immediately
    playSound();

    // Set up repeating play for 15 seconds (play every 3 seconds)
    let playCount = 0;
    const maxPlays = 5; // 5 plays over 15 seconds
    
    if (playTimeoutRef.current) {
      clearInterval(playTimeoutRef.current);
    }

    playTimeoutRef.current = setInterval(() => {
      playCount++;
      if (playCount < maxPlays) {
        playSound();
      } else {
        if (playTimeoutRef.current) {
          clearInterval(playTimeoutRef.current);
        }
      }
    }, 3000);
  }, [isAudioEnabled]);

  // Manage alert intervals based on unacknowledged orders
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Check if there are new unacknowledged orders
    const currentCount = unacknowledgedOrders.length;
    if (currentCount > previousOrderCountRef.current && isAudioEnabled) {
      // New unacknowledged order detected, play immediately
      playAlertSound();
    }
    previousOrderCountRef.current = currentCount;

    if (unacknowledgedOrders.length > 0 && isAudioEnabled) {
      // Set up interval to repeat every 60 seconds
      intervalRef.current = setInterval(() => {
        if (unacknowledgedOrders.length > 0) {
          playAlertSound();
        }
      }, 60000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playTimeoutRef.current) {
        clearInterval(playTimeoutRef.current);
      }
    };
  }, [unacknowledgedOrders.length, isAudioEnabled, playAlertSound]);

  // Subscribe to realtime order inserts
  useEffect(() => {
    const channel = supabase
      .channel('order-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('New order received:', payload);
          toast.info(`New order received! #${(payload.new as any).order_number}`, {
            duration: 10000,
          });
          // Trigger parent to refresh orders
          onNewOrder?.();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onNewOrder]);

  const acknowledgeOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ acknowledged: true })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state immediately
      setUnacknowledgedOrders(current => 
        current.filter(o => o.id !== orderId)
      );

      // Notify parent component
      onOrderUpdate?.(orderId, true);

      // Stop current play timeout
      if (playTimeoutRef.current) {
        clearInterval(playTimeoutRef.current);
      }

      toast.success('Order acknowledged');
    } catch (error) {
      console.error('Error acknowledging order:', error);
      toast.error('Failed to acknowledge order');
    }
  };

  const enableAudio = useCallback(() => {
    setIsAudioEnabled(true);
    // Try to play a silent sound to unlock audio context
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = 0.8;
        }
        toast.success('Audio alerts enabled');
      }).catch(() => {
        toast.error('Could not enable audio. Try again.');
      });
    }
  }, []);

  return {
    unacknowledgedOrders,
    acknowledgeOrder,
    isAudioEnabled,
    enableAudio,
  };
}
