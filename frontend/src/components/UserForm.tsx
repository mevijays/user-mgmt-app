import React, { useState } from 'react';
import { User } from '../types/User';

interface UserFormProps {
    user?: User;
    onSubmit: (user: User) => void;
    onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<User>({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        active: user?.active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>
            <div className="form-group">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="activeSwitch"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />
                    <label className="custom-control-label" htmlFor="activeSwitch">Active</label>
                </div>
            </div>
            <div className="form-group mt-4">
                <button type="submit" className="btn btn-primary mr-2">
                    <i className="fas fa-save mr-2"></i>Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    <i className="fas fa-times mr-2"></i>Cancel
                </button>
            </div>
        </form>
    );
};

export default UserForm;