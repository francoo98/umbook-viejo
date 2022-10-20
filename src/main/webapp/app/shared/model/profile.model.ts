import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IPost } from 'app/shared/model/post.model';

export interface IProfile {
  id?: number;
  username?: string | null;
  password?: string | null;
  email?: string | null;
  creacion?: string | null;
  ownedBy?: IUser | null;
  createds?: IPost[] | null;
  follows?: IProfile[] | null;
  followedBies?: IProfile[] | null;
  likes?: IPost[] | null;
}

export const defaultValue: Readonly<IProfile> = {};
