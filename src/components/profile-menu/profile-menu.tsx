import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '../../components/ui/profile-menu/profile-menu';
import { logoutUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser())
    // const res = 
    dispatch(logoutUser())
    // res.then((res: any) => {
    //     if(res.payload.success === true) {
    //         navigate('/login');
    //     };
    // })
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
