import React, { FC } from 'react';
import Select from 'components/forms/select';
import cx from 'classnames';

import { useSession } from 'hooks/session';

const THEMES = {
  light: {
    base: 'text-white hover:border-white',
  },
  dark: {
    base: 'text-blue-800 hover:border-blue-800',
  },
};

const USER_OPTIONS = [
  { label: 'Profile', value: 'profile' },
  { label: 'Sign Out', value: 'sign_out' },
];
const ADMIN_OPTIONS = [
  { label: 'Admin Panel', value: 'admin_panel' },
  { label: 'Profile', value: 'profile' },
  { label: 'Sign Out', value: 'sign_out' },
];

interface UserInfoProps {
  theme: 'light' | 'dark';
}

const UserInfo: FC<UserInfoProps> = ({ theme }: UserInfoProps) => {
  const { data: user } = useSession();

  const handleSelect = (option: string) => {
    if (option === 'profile') window.location.assign('/auth/edit');
    if (option === 'sign_out') window.location.assign('/auth/sign_out');
    if (option === 'admin_panel') window.location.assign('/admin');
  };

  if (user) {
    const options = user.account_type === 'admin' ? ADMIN_OPTIONS : USER_OPTIONS;

    return (
      <div
        className={cx('p-2 font-bold tracking-tight border-b-4 border-transparent', {
          [THEMES[theme].base]: true,
        })}
      >
        <Select
          id="user-select"
          theme="user"
          size="user"
          placeholder={user.email}
          maxHeight={400}
          options={options}
          onChange={handleSelect}
        />
      </div>
    );
  }
  return (
    <button
      className={cx('p-2 font-bold tracking-tight border-b-4 border-transparent', {
        [THEMES[theme].base]: true,
      })}
      onClick={() => window.location.assign('/auth/sign_in')}
    >
      Sign in
    </button>
  );
};

export default UserInfo;
