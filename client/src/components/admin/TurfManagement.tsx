import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import {debounce} from "lodash"
import { useGetAllTurfsQuery} from "../../hooks/admin/useGetAllTurfs";
import { getAllTurfs} from "../../services/admin/adminService";
import { ITurf } from "../../types/Type";
import { Pagination1 } from "./Pagination";
import { useUpdateturfstatus } from "../../hooks/admin/useUpdateTurfUseCase";



export default function TurfManagement() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch,setdebouncedSearch] = useState(searchQuery);
  const [currentPage,setCurrentPage] = useState(1);
  

  const limit = 10;
  const {mutate:updateTurfStatus} = useUpdateturfstatus(currentPage,limit,debouncedSearch)

  useEffect(()=>{
    const handler = debounce(()=>setdebouncedSearch(searchQuery),300);
    handler();
    return ()=>handler.cancel();
  },[searchQuery]);

  const {data} = useGetAllTurfsQuery(
    getAllTurfs,
    currentPage,
    limit,
    debouncedSearch
  )

  const turfs=(data?.turfs?? []) as ITurf[];
  const totalPages = data?.totalPages || 1
  console.log(data);

  function StatusBadge({ status }: { status: boolean }) {
    const color = status
      ? "bg-red-100 text-red-800"     // Blocked
      : "bg-green-100 text-green-800"; // Active
  
    const label = status ? "Blocked" : "Active";
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        {label}
      </span>
    );
  }
  const handleBlockStatus=(turfId:string)=>{
    updateTurfStatus(turfId)
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {turfs.map((turf) => (
              <TableRow key={turf._id}>
                <TableCell className="font-medium">{turf.name}</TableCell>
                <TableCell>{turf.email}</TableCell>
                <TableCell>{turf.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={turf.isBlocked} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {turf.isBlocked  ? (
                      <Button variant="destructive" size="sm" onClick={()=>handleBlockStatus(turf._id)}>
                        Block
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600 border-green-600"
                        onClick={()=>handleBlockStatus(turf._id)}
                      >
                        Unblock
                      </Button>
                    )}
                    {/* <ActionMenu /> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination1 currentPage={currentPage} totalPages={totalPages} onPageNext={() => setCurrentPage(currentPage + 1)} onPagePrev={() => setCurrentPage(currentPage - 1)}/>
      </div>
    </div>
  );
}