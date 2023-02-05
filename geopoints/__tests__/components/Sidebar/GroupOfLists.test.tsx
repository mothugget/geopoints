import { render, screen, act } from '../../tests-utils';
import GroupOfLists from '../../../components/Sidebar/GroupOfLists';
import { List, User } from '../../../types/types';
import '@testing-library/jest-dom';

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
    it('Should render: Your Lists!', async () => {
      act(() => {
        render(<GroupOfLists lists={[fakeList]} title={'Your Lists!'} />);
      });
      await act(async () => {
        const title = await screen.findByText('Your Lists!');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Your Lists!');
      });
    });

    it('Should render: Your Points!', async () => {
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

  describe('Shows message when no lists', () => {
    it('Should display: Nothing here yet...', async () => {
      act(() => {
        render(<GroupOfLists lists={[]} title={'Your lists!'} />);
      });
      await act(async () => {
        const message = await screen.findByText('Nothing here yet...');
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent('Nothing here yet...');
      });
    });
  });

  describe('Renders the correct number of lists', () => {
    it('Should display 3 ListToggle components', async () => {
      act(() => {
        render(
          <GroupOfLists
            lists={[
              { ...fakeList, id: Math.random() },
              { ...fakeList, id: Math.random() },
              { ...fakeList, id: Math.random() },
            ]}
            title={'Your lists!'}
          />
        );
      });
      await act(async () => {
        const lists = await screen.findAllByTestId('ListToggle');
        expect(lists.length).toBe(3);
      });
    });
    it('Should display 1 ListToggle component', async () => {
      act(() => {
        render(
          <GroupOfLists
            lists={[{ ...fakeList, id: Math.random() }]}
            title={'Your lists!'}
          />
        );
      });
      await act(async () => {
        const lists = await screen.findAllByTestId('ListToggle');
        expect(lists.length).toBe(1);
      });
    });
  });
});
