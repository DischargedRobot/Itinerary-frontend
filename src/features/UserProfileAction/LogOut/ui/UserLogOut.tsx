'use client'

import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useLogOut } from '../model/useLogOut';

export const UserLogOut: React.FC = () => {
    const { logout, isLoading } = useLogOut();

    return (
        <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={logout}
            loading={isLoading}
        />
    );
};