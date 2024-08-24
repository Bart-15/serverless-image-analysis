import { AuthUser, fetchAuthSession, signOut } from 'aws-amplify/auth';
import { useEffect } from 'react';
import { removeHeaderToken, setHeaderToken } from '../utils/axios';
type UserNavBarProps = {
  user: AuthUser | undefined;
  resetState: () => void;
};

const UserNavbar = ({ user, resetState }: UserNavBarProps) => {
  useEffect(() => {
    async function init() {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString() as unknown as string;

      setHeaderToken(token);
    }

    init();
  }, []);

  async function handleSignout() {
    removeHeaderToken();
    resetState();
    await signOut();
  }
  return (
    <div className="flex flex-col items-end mb-10">
      <div className="flex gap-4 items-center">
        <p>Welcome back, {user?.username} 🚀</p>
        <button
          className="bg-blue-700 text-white py-2 px-3 rounded-md hover:bg-blue-600"
          onClick={handleSignout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserNavbar;
