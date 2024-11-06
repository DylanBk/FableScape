import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const authCheck = () => {
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.startsWith('loggedIn='));
};

window.onbeforeunload = null;


function Settings() {
    const isLoggedIn = authCheck();

    const [showNewUsernameForm, setShowNewUsername] = useState(false);
    const [showNewPwForm, setShowNewPwForm] = useState(false);
    const [showDelAccForm, setShowDelAccForm] = useState(false);

    const [delFormPw, setDelFormPw] = useState({ password: "" });
    const [newUsername, setNewUsername] = useState({ username: "" });
    const [newPw, setNewPw] = useState({ password: "" });

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setNewUsername({ ...newUsername, [name]: value });
    };

    const handlePwChange = (e) => {
        const { name, value } = e.target;
        setNewPw({ ...newPw, [name]: value });
    };

    const handleDelFormChange = (e) => {
        const { name, value } = e.target;
        setDelFormPw({ ...delFormPw, [name]: value });
    };

    if (!isLoggedIn) {
        window.onbeforeunload = null;
        window.location.href = '/login';
    }

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch('/settings')
            .then(res => res.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => console.log(`Error fetching user data: ${error}`));
    }, []);

    const handleLogout = () => {
        fetch('/logout', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Logout failed");
                }
                return response.json();
            })
            .then(() => {
                document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                window.onbeforeunload = null;
                window.location.href = '/login';
            })
            .catch(error => console.log(`error logging out: ${error}`));
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const { password } = delFormPw;

        await fetch('/settings/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Account deletion failed");
                }
                return response.json();
            })
            .then(() => {
                document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                window.onbeforeunload = null;
                window.location.href = '/';
            })
            .catch(error => console.log("account deletion failed: ", error));
    };

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        const { username } = newUsername;

        await fetch('/settings/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Username change failed");
                }
                return response.json();
            })
            .then(() => {
                setNewUsername({ username: "" });
                setShowNewUsername(false);
                window.onbeforeunload = null;
                window.location.reload()
            })
            .catch(error => console.log("Username change failed: ", error));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const { password } = newPw;
    
        try {
            const response = await fetch('/settings/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            });
    
            if (!response.ok) {
                throw new Error("Password change failed");
            }
    
            const result = await response.json();
            if (result.message === "password updated successfully") {
                setNewPw({ password: "" });
                setShowNewPwForm(false);
            }
        } catch (error) {
            console.log("Password change failed: ", error);
        }
    };
    

    const closeDelAccForm = () => setShowDelAccForm(false);
    const closeNewUsernameForm = () => setShowNewUsername(false);
    const closeNewPwForm = () => setShowNewPwForm(false);

    return (
        <div>
            <Header />

            <div className="h-96 w-4/5 relative p-4 rounded-lg mx-auto my-8 bg-gray-300">
                {userData ? (
                    <div className="flex flex-col items-center">
                        <button
                            className="absolute top-4 right-4 px-4 py-2 rounded border-2 border-red-500 hover:border-red-700 text-red-500 hover:text-red-700 transition-colors"
                            onClick={handleLogout}>
                            Logout
                        </button>

                        <p className="text-lg underline underline-offset-2 font-bold">{userData.username}</p>
                        <p className="mb-10 text-base">{userData.email}</p>

                        <button
                            className="px-4 py-2 rounded mb-4 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                            onClick={() => setShowNewUsername(true)}>
                            Change Username
                        </button>
                        {showNewUsernameForm && (
                            <form onSubmit={handleChangeUsername} className="mb-4">
                                <input
                                    type="text"
                                    name="username"
                                    value={newUsername.username}
                                    onChange={handleNameChange}
                                    placeholder="New Username"
                                    className="border p-2"
                                />
                                <button type="submit" className="ml-2 px-4 py-2 bg-green-500 text-white">Submit</button>
                                <button type="button" className="ml-2 px-4 py-2 bg-red-500 text-white" onClick={closeNewUsernameForm}>Cancel</button>
                            </form>
                        )}

                        <button
                            className="px-4 py-2 rounded mb-10 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                            onClick={() => setShowNewPwForm(true)}>
                            Change Password
                        </button>
                        {showNewPwForm && (
                            <form onSubmit={handleChangePassword} className="mb-10">
                                <input
                                    type="password"
                                    name="password"
                                    value={newPw.password}
                                    onChange={handlePwChange}
                                    placeholder="New Password"
                                    className="border p-2"
                                />
                                <button type="submit" className="ml-2 px-4 py-2 bg-green-500 text-white">Submit</button>
                                <button type="button" className="ml-2 px-4 py-2 bg-red-500 text-white" onClick={closeNewPwForm}>Cancel</button>
                            </form>
                        )}

                        <button
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white transition-colors"
                            onClick={() => setShowDelAccForm(true)}>
                            Delete Account
                        </button>

                        {showDelAccForm && (
                            <div id="delete-account-check-wrapper" className="z-50">
                                <div className="h-full w-full absolute left-1/2 top-1/2 bg-black bg-opacity-40 -translate-x-1/2 -translate-y-1/2 z-50"></div>
                                <form
                                    id="delete-account-check"
                                    className="h-52 absolute left-1/2 top-1/2 flex flex-col items-center p-4 bg-gray-300 -translate-x-1/2 -translate-y-1/2 z-50"
                                    onSubmit={handleDeleteAccount}>
                                    <button
                                        className="h-6 w-6 absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white text-center"
                                        type="button"
                                        onClick={closeDelAccForm}>X</button>
                                    <p className="mt-2"><strong className="text-red-500">Warning:</strong> This action cannot be reversed and all your data will be deleted.</p>
                                    <label className="mt-6">
                                        Password:
                                        <input
                                            className="border-b border-black bg-gray-300"
                                            name="password"
                                            type="password"
                                            value={delFormPw.password}
                                            onChange={handleDelFormChange} // Add this line
                                            required
                                        ></input>
                                    </label>
                                    <button
                                        className="absolute bottom-4 px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white transition-colors"
                                        type="submit">
                                        Confirm
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl animate-pulse">Loading user data...</p>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Settings;
