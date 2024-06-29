import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  id: number;
  name: string;
  followed: boolean;
  profileImage: string;
  subname: string;
}

export interface Post {
  id: number;
  uploadedImages: string[];
  likeCount: number;
  commentCount: number;
  username: string;
  userProfileImage: string;
  isLiked:boolean
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
  posts: [
    {
      id: 1,
      uploadedImages: [
        'https://picsum.photos/id/1040/300',
        'https://picsum.photos/id/1041/300',
      ],
      likeCount: 120,
      commentCount: 45,
      username: 'Emma Watson',
      userProfileImage: 'https://picsum.photos/id/1005/100',
      isLiked: false
    },
    {
      id: 2,
      uploadedImages: [
        'https://picsum.photos/id/1042/300',
        'https://picsum.photos/id/1043/300',
      ],
      likeCount: 80,
      commentCount: 32,
      username: 'Liam Johnson',
      userProfileImage: 'https://picsum.photos/id/1006/100',
      isLiked: false
    },
    {
      id: 3,
      uploadedImages: [
        'https://picsum.photos/id/1044/300',
        'https://picsum.photos/id/1045/300',
      ],
      likeCount: 150,
      commentCount: 67,
      username: 'Olivia Brown',
      userProfileImage: 'https://picsum.photos/id/1008/100',
      isLiked: false
    },
    {
      id: 4,
      uploadedImages: [
        'https://picsum.photos/id/1046/300',
        'https://picsum.photos/id/1047/300',
      ],
      likeCount: 90,
      commentCount: 40,
      username: 'Noah Smith',
      userProfileImage: 'https://picsum.photos/id/1011/100',
      isLiked: false
    },
    {
      id: 5,
      uploadedImages: [
        'https://picsum.photos/id/1048/300',
        'https://picsum.photos/id/1049/300',
      ],
      likeCount: 200,
      commentCount: 75,
      username: 'Ava Davis',
      userProfileImage: 'https://picsum.photos/id/1012/100',
      isLiked: false
    },
    {
      id: 6,
      uploadedImages: [
        'https://picsum.photos/id/1050/300',
        'https://picsum.photos/id/1051/300',
      ],
      likeCount: 170,
      commentCount: 85,
      username: 'Elijah Wilson',
      userProfileImage: 'https://picsum.photos/id/1015/100',
      isLiked: false
    },
    {
      id: 7,
      uploadedImages: [
        'https://picsum.photos/id/1052/300',
        'https://picsum.photos/id/1053/300',
      ],
      likeCount: 110,
      commentCount: 50,
      username: 'Sophia Martinez',
      userProfileImage: 'https://picsum.photos/id/1016/100',
      isLiked: false
    },
    {
      id: 8,
      uploadedImages: [
        'https://picsum.photos/id/1054/300',
        'https://picsum.photos/id/1055/300',
      ],
      likeCount: 130,
      commentCount: 60,
      username: 'James Anderson',
      userProfileImage: 'https://picsum.photos/id/1018/100',
      isLiked: false
    },
    {
      id: 9,
      uploadedImages: [
        'https://picsum.photos/id/1056/300',
        'https://picsum.photos/id/1057/300',
      ],
      likeCount: 95,
      commentCount: 43,
      username: 'Isabella Garcia',
      userProfileImage: 'https://picsum.photos/id/1020/100',
      isLiked: false
    },
    {
      id: 10,
      uploadedImages: [
        'https://picsum.photos/id/1058/300',
        'https://picsum.photos/id/1059/300',
      ],
      likeCount: 125,
      commentCount: 52,
      username: 'William Taylor',
      userProfileImage: 'https://picsum.photos/id/1021/100',
      isLiked: false
    },
  ],
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
    toggleLike(state, action: PayloadAction<number>) {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likeCount += post.isLiked ? 1 : -1;
      }
    },
  },
});


export const { toggleFollow, addPost, toggleLike } = userSlice.actions;
export default userSlice;