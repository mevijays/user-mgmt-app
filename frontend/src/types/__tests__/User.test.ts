import { User } from '../User';

describe('User Type', () => {
  it('creates a valid user object', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      active: true
    };

    expect(user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      active: expect.any(Boolean)
    });
  });

  it('handles optional properties', () => {
    const user: User = {
      name: 'Test User',
      email: 'test@example.com',
      active: true
    };

    expect(user.id).toBeUndefined();
    expect(user.phone).toBeUndefined();
  });

  it('allows updating user properties', () => {
    const user: User = {
      name: 'Test User',
      email: 'test@example.com',
      active: true
    };

    const updatedUser: User = {
      ...user,
      name: 'Updated Name',
      active: false
    };

    expect(updatedUser.name).toBe('Updated Name');
    expect(updatedUser.active).toBe(false);
    expect(updatedUser.email).toBe(user.email);
  });
});