import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { api } from '../services/api';
import UserForm from './UserForm';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (user: User) => {
        try {
            const newUser = await api.createUser(user);
            setUsers([...users, newUser]);
            setShowForm(false);
        } catch (err) {
            setError('Failed to create user');
        }
    };

    const handleUpdateUser = async (user: User) => {
        try {
            if (editingUser?.id) {
                const updatedUser = await api.updateUser(editingUser.id, user);
                setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
                setEditingUser(null);
            }
        } catch (err) {
            setError('Failed to update user');
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setError('Failed to delete user');
            }
        }
    };

    return (
        <div className="user-management">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Users</h2>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setShowForm(true)}
                >
                    <i className="fas fa-plus mr-2"></i>Add New User
                </button>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {(showForm || editingUser) && (
                <div className="card mb-4">
                    <div className="card-body">
                        <UserForm
                            user={editingUser || undefined}
                            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingUser(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <span className={`badge badge-${user.active ? 'success' : 'secondary'}`}>
                                            {user.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-primary mr-2"
                                            onClick={() => setEditingUser(user)}
                                        >
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => user.id && handleDeleteUser(user.id)}
                                        >
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;