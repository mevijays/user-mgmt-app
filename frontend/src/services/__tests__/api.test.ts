import { api } from '../api';
import axios from 'axios';

jest.mock('axios');

describe('API Service', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    active: true
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches users', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [mockUser] });
    const result = await api.getUsers();
    expect(result).toEqual([mockUser]);
  });

  it('creates user', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockUser });
    const result = await api.createUser(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('updates user', async () => {
    (axios.put as jest.Mock).mockResolvedValueOnce({ data: mockUser });
    const result = await api.updateUser(1, mockUser);
    expect(result).toEqual(mockUser);
  });

  it('deletes user', async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({});
    await api.deleteUser(1);
    expect(axios.delete).toHaveBeenCalled();
  });

  it('handles errors', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    await expect(api.getUsers()).rejects.toThrow('API Error');
  });
});