import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import UserList from '../UserList';
import { api } from '../../services/api';

jest.mock('../../services/api');

describe('UserList', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    active: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    (api.getUsers as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    await act(async () => {
      render(<UserList />);
    });
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays users after loading', async () => {
    (api.getUsers as jest.Mock).mockResolvedValue([mockUser]);
    
    await act(async () => {
      render(<UserList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });

  it('handles add user workflow', async () => {
    (api.getUsers as jest.Mock).mockResolvedValue([mockUser]);
    (api.createUser as jest.Mock).mockResolvedValue({
      ...mockUser,
      id: 2,
      name: 'New User'
    });
    
    await act(async () => {
      render(<UserList />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Add New User'));
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'New User' } });
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(api.createUser).toHaveBeenCalled();
      expect(screen.getByText('New User')).toBeInTheDocument();
    });
  });

  it('handles delete user', async () => {
    (api.getUsers as jest.Mock).mockResolvedValue([mockUser]);
    (api.deleteUser as jest.Mock).mockResolvedValue(undefined);
    window.confirm = jest.fn(() => true);

    await act(async () => {
      render(<UserList />);
    });

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(api.deleteUser).toHaveBeenCalledWith(mockUser.id);
  });

  it('handles errors gracefully', async () => {
    (api.getUsers as jest.Mock).mockRejectedValue(new Error('Failed to load users'));

    await act(async () => {
      render(<UserList />);
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to load users');
    });
  });

  it('handles update user', async () => {
    (api.getUsers as jest.Mock).mockResolvedValue([mockUser]);
    (api.updateUser as jest.Mock).mockResolvedValue({
      ...mockUser,
      name: 'Updated User'
    });

    await act(async () => {
      render(<UserList />);
    });

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Edit'));
    });

    const nameInput = screen.getByLabelText(/name/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Updated User' } });
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(api.updateUser).toHaveBeenCalled();
      expect(screen.getByText('Updated User')).toBeInTheDocument();
    });
  });
});