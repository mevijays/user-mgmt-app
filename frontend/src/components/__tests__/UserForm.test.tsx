import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';

describe('UserForm Component', () => {
    const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        active: true
    };

    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders empty form correctly', () => {
        render(<UserForm onSubmit={mockSubmit} onCancel={mockCancel} />);
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders form with user data', () => {
        render(<UserForm user={mockUser} onSubmit={mockSubmit} onCancel={mockCancel} />);
        expect(screen.getByLabelText(/name/i)).toHaveValue(mockUser.name);
        expect(screen.getByLabelText(/email/i)).toHaveValue(mockUser.email);
    });

    it('handles form submission', () => {
        render(<UserForm onSubmit={mockSubmit} onCancel={mockCancel} />);
        
        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'New User' }
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'new@example.com' }
        });
        
        fireEvent.click(screen.getByText(/save/i));
        
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
            name: 'New User',
            email: 'new@example.com'
        }));
    });

    it('handles cancel button click', () => {
        render(<UserForm onSubmit={mockSubmit} onCancel={mockCancel} />);
        fireEvent.click(screen.getByText(/cancel/i));
        expect(mockCancel).toHaveBeenCalled();
    });
});