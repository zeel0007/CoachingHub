import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/api';
import { Users } from 'lucide-react';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center">Loading users...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
        <Users className="w-5 h-5 text-primary-400" /> Registered Students Directory
      </h2>
      <div className="overflow-x-auto bg-[#1e293b]/50 border border-[var(--glass-border)] rounded-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-[#0f172a] border-b border-[var(--glass-border)]">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b border-[var(--glass-border)] hover:bg-[#334155]/50">
                <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${u.role === 'admin' ? 'bg-red-900/30 text-red-400 border-red-500/30' : 'bg-green-900/30 text-green-400 border-green-500/30'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTab;
