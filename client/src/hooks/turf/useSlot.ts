import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSlots } from '../../services/turf/turfServices';


export const useSlots = (turfId: string, selectedDate: string) => {
  return useQuery({
    queryKey: ['slots', turfId, selectedDate],
    queryFn: () => fetchSlots(turfId, selectedDate),
    enabled: !!turfId && !!selectedDate,
  });
};
