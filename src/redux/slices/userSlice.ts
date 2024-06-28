import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface Person {
  id: number;
  name: string;
  followed: boolean;
}

interface Post {
  id: number;
  content: string;
  // Add more post fields as needed
}

interface UserState {
  people: Person[];
  posts: Post[];
}

// Define the initial state with the types
const initialState: UserState = {
  people: [
    { id: 1, name: 'User1', followed: false },
    { id: 2, name: 'User2', followed: false },
    // Add more users
  ],
  posts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFollow(state, action: PayloadAction<number>) {
      const person = state.people.find(p => p.id === action.payload);
      if (person) person.followed = !person.followed;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
  },
});

export const { toggleFollow, addPost } = userSlice.actions;
export default userSlice;