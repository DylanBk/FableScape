import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './Header';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

describe("Header Component Unit Test", () => {
    const useLocationMock = require('react-router-dom').useLocation; //used to test links

    beforeEach(() => {
        useLocationMock.mockReturnValue({ pathname: '/' });
    });

    test("Header Height on Home Page", () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        const header = screen.queryByRole('banner');
    expect(header).toHaveClass('h-16 sm:h-20 md:h-32 xl:h-40');
    });

    test("Header Height on Login Page", () => {
        useLocationMock.mockReturnValue({ pathname: '/login' });
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        const header = screen.queryByRole('banner');
    expect(header).toHaveClass('h-10 sm:h-14 md:h-28 xl:h-32');
    });

    test("Login Button Exists on Home Page", () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    const login_link = screen.queryByAltText("Login Button Background")
    expect(login_link).toBeInTheDocument();
    });

    test("Login Button does Not Exist on Login Page", () => {
        useLocationMock.mockReturnValue({ pathname: '/login' });
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        const login_link = screen.queryByAltText('Login Button Background');
        expect(login_link).toBeNull();
    })

});