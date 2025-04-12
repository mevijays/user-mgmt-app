import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders application structure', () => {
    render(<App />);
    
    // Test navbar
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('User Management System')).toBeInTheDocument();
    
    // Test main content
    expect(screen.getByText('Users')).toBeInTheDocument();
    
    // Test footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2025/)).toBeInTheDocument();
  });

  it('renders UserList component', () => {
    render(<App />);
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });
});
