import { IProfile } from 'app/shared/model/profile.model';

export interface IPost {
  id?: number;
  title?: string | null;
  contents?: string | null;
  likes?: IProfile[] | null;
  createdBy?: IProfile | null;
}

export const defaultValue: Readonly<IPost> = {};
