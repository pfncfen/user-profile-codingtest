import './home.css';

import { useEffect, useState } from 'react';

import blockletLogo from '../assets/blocklet.svg';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import api from '../libs/api';

enum InputType {
  Username = 'username',
  Email = 'email',
  Phone = 'phone',
}

type Profile = {
  username: string;
  email: string;
  phone: string;
};

const DefaultProfile: Profile = {
  username: 'default user',
  email: 'default@xxx.com',
  phone: '138xxxxxxxx',
};

function Home() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<Profile>(DefaultProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: InputType) => {
    const { value } = e.target;
    setProfile((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  async function getUserProfileData() {
    const { data } = await api.get('/api/profile');
    const { results } = data;

    if (results && results.length > 0) {
      setProfile(results[0]);
    }
  }

  async function setUserProfileData() {
    const { data } = await api.post('/api/profile', profile);
    return data;
  }

  const handleSaveClick = () => {
    setUserProfileData().then((res) => {
      if (res === 'OK') setEditMode(false);
    });
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
      </div>
      <h1>User profile</h1>
      <div className="form">
        <div className="form-item">
          <span className="form-item-label">用户名：</span>
          <input
            placeholder="请输入用户名"
            disabled={!editMode}
            value={profile.username}
            onChange={(e) => handleInputChange(e, InputType.Username)}
          />
        </div>
        <div className="form-item">
          <span className="form-item-label">邮箱：</span>
          <input
            placeholder="请输入邮箱"
            disabled={!editMode}
            value={profile.email}
            onChange={(e) => handleInputChange(e, InputType.Email)}
          />
        </div>
        <div className="form-item">
          <span className="form-item-label">手机号：</span>
          <input
            placeholder="请输入手机号"
            disabled={!editMode}
            value={profile.phone}
            onChange={(e) => handleInputChange(e, InputType.Phone)}
          />
        </div>
        <div className="form-item">
          {editMode ? (
            <button type="button" onClick={() => handleSaveClick()}>
              保存
            </button>
          ) : (
            <button type="button" onClick={() => setEditMode(!editMode)}>
              编辑
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
