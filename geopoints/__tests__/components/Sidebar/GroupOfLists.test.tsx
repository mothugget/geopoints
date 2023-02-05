import { render, screen, act } from '../../tests-utils';
import GroupOfLists from '../../../components/Sidebar/GroupOfLists';
import '@testing-library/jest-dom';
import { List, User } from '../../../types/types';

const fakeUser: User = {
  email: '',
  userName: '',
  ownLists: [],
  likedPoints: [],
  likedLists: [],
};
const fakeList: List = {
  title: 'Testing',
  author: fakeUser,
  id: Math.random(),
  imagePath: '',
  description: '',
  isPublic: false,
  tags: [],
};

describe('GroupOfLists', () => {
  describe('Renders the correct title', () => {
    it('renders the correct title', async () => {
      act(() => {
        render(<GroupOfLists lists={[fakeList]} title={'Your lists!'} />);
      });
      await act(async () => {
        const title = await screen.findByText('Your lists!');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Your lists!');
      });
    });
    it('renders the correct title', async () => {
      act(() => {
        render(<GroupOfLists lists={[fakeList]} title={'Your Points!'} />);
      });
      await act(async () => {
        const title = await screen.findByText('Your Points!');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Your Points!');
        expect(title).to;
      });
    });
  });
});
