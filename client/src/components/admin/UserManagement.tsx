import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import {debounce} from "lodash"
import { useGetAllUsersQuery } from "../../hooks/admin/useGetAllUsers";
import { getAllUsers } from "../../services/admin/adminService";
import { IClient } from "../../types/Type";
import { Pagination1 } from "./Pagination";
import { useUpdateUserStatus } from "../../hooks/admin/useUpdateUserStatus";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function UserManagement() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch,setdebouncedSearch] = useState(searchQuery);
  const [currentPage,setCurrentPage] = useState(1);
  

  const limit = 10;
  const {mutate:updateUserStatus} = useUpdateUserStatus(currentPage,limit,debouncedSearch)

  useEffect(()=>{
    const handler = debounce(()=>setdebouncedSearch(searchQuery),500);
    handler();
    return ()=>handler.cancel();
  },[searchQuery]);

  const {data} = useGetAllUsersQuery(
    getAllUsers,
    currentPage,
    limit,
    debouncedSearch
  )

  const users=(data?.users?? []) as IClient[];
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
  const handleBlockStatus = (userId: string, isBlocked: boolean) => {
    Swal.fire({
      title: isBlocked ? "Unblock this user?" : "Block this user?",
      text: `Are you sure you want to ${isBlocked ? "unblock" : "block"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#10B981" : "#d33",
      cancelButtonColor: "#6B7280",
      confirmButtonText: isBlocked ? "Yes, unblock" : "Yes, block"
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserStatus(userId, {
          onSuccess: () => {
            toast.success(`User has been ${isBlocked ? "unblocked" : "blocked"} successfully`);
          },
          onError: () => {
            toast.error(`Failed to ${isBlocked ? "unblock" : "block"} the user`);
          }
        });
      }
    });
  };
  
  
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
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={user.isBlocked} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {user.isBlocked  ? (
                      <Button variant="destructive" size="sm" onClick={()=>handleBlockStatus(user._id,user.isBlocked)}>
                        Block
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600 border-green-600"
                        onClick={()=>handleBlockStatus(user._id,user.isBlocked)}
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