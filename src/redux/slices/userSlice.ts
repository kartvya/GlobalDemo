import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  id: number;
  name: string;
  followed: boolean;
  profileImage: string;
  subname: string;
}

interface Post {
  id: number;
  content: string;
}

interface UserState {
  people: Person[];
  posts: Post[];
}

const initialState: UserState = {
  people: [
    { id: 1, name: 'Emma Watson', subname: 'Software Developer', followed: false, profileImage: 'https://picsum.photos/id/1005/100' },
    { id: 2, name: 'Liam Johnson', subname: 'UI/UX Designer', followed: false, profileImage: 'https://picsum.photos/id/1006/100' },
    { id: 3, name: 'Olivia Brown', subname: 'Project Manager', followed: false, profileImage: 'https://picsum.photos/id/1008/100' },
    { id: 4, name: 'Noah Smith', subname: 'Data Analyst', followed: false, profileImage: 'https://picsum.photos/id/1011/100' },
    { id: 5, name: 'Ava Davis', subname: 'Marketing Specialist', followed: false, profileImage: 'https://picsum.photos/id/1012/100' },
    { id: 6, name: 'Elijah Wilson', subname: 'Frontend Developer', followed: false, profileImage: 'https://picsum.photos/id/1015/100' },
    { id: 7, name: 'Sophia Martinez', subname: 'Backend Developer', followed: false, profileImage: 'https://picsum.photos/id/1016/100' },
    { id: 8, name: 'James Anderson', subname: 'System Architect', followed: false, profileImage: 'https://picsum.photos/id/1018/100' },
    { id: 9, name: 'Isabella Garcia', subname: 'DevOps Engineer', followed: false, profileImage: 'https://picsum.photos/id/1020/100' },
    { id: 10, name: 'William Taylor', subname: 'Database Administrator', followed: false, profileImage: 'https://picsum.photos/id/1021/100' },
    { id: 11, name: 'Mia Moore', subname: 'QA Engineer', followed: false, profileImage: 'https://picsum.photos/id/1024/100' },
    { id: 12, name: 'Benjamin Lee', subname: 'Network Engineer', followed: false, profileImage: 'https://picsum.photos/id/1025/100' },
    { id: 13, name: 'Charlotte White', subname: 'Security Analyst', followed: false, profileImage: 'https://picsum.photos/id/1027/100' },
    { id: 14, name: 'Henry Harris', subname: 'Mobile Developer', followed: false, profileImage: 'https://picsum.photos/id/1028/100' },
    { id: 15, name: 'Amelia Martin', subname: 'AI Specialist', followed: false, profileImage: 'https://picsum.photos/id/1031/100' },
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