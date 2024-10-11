import React, { useState, createContext, useContext } from 'react';

// ProfileContext 생성
const ProfileContext = createContext();

// Provider 컴포넌트 생성
export const ProfileProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);  // 프로필 이미지 상태

    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileContext.Provider>
    );
};

// 다른 컴포넌트에서 ProfileContext 사용을 위한 훅
export const useProfile = () => useContext(ProfileContext);