"use client";
import { useConfirm } from '@/hooks/useConfirm';
import { useUser } from '@/hooks/useUser';
import { fetchEntries } from '@/lib/allApiRequest/apiRequests';
import { Entry } from '@/lib/interfaces/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const Entries = () => {
 const params=  useParams();
      const { user } = useUser();
      const { confirm, ConfirmModal } = useConfirm();
    
     const userId = user?.id ?? user?._id;
    
      const { data, isLoading } = useQuery({
        queryKey: ["entries"],
        enabled: !!userId,
        queryFn: async () => {
          const res = await fetchEntries(String(userId), params.id as string);
          console.log(res)
          return res.data as Entry[];
        },
      });
    
      const entries = data || [];

      console.log(entries,params.id);


    return (
        <div>
            Entries    list page
            
            {ConfirmModal}
        </div>
    );
};

export default Entries;