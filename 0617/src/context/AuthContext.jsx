import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/apis/supabaseApi';

const AuthContext = createContext();
// AuthContext라는 컨텍스트를 생성

// 자식 컴포넌트를 감싸고 인증 상태를 제공하는 AuthProvider 컴포넌트
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const session = supabase.user();
    // setUser(session?.user ?? null);
    // 세션이 없으면 null로 설정합니다.
    //onAuthStateChange 리스너 설정 인증 상태가 변경될 때마다 호출됩니다
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // /인증 상태가 변경될 때마다 user 상태를 업데이트합니다. 세션이 없으면 null로 설정합니다.
    });

    return () => {
      subscription.unsubscribe();
      //컴포넌트가 언마운트될 때 호출되어 리스너를 해제
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

// 특정 Context 객체를 인자로 받아, 그 Context의 현재 값을 반환합니다
// 중첩된 컴포넌트들 사이에서 props를 직접 전달하지 않고도 데이터를 공유할 수 있습니다.
export const useAuth = () => useContext(AuthContext);
//AuthContext를 사용하여 현재 인증 상태를 반환하는 훅을 생성합니다. 이를 통해 컴포넌트 내에서 간편하게 인증 상태를 사용할 수 있습니다.
// 프롭드릴링 처럼 내려줘야한다.
export default AuthProvider;
