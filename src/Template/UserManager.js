import React from "react";
import { Route } from "react-router-dom";
import AddUserPage from "../Screens/Admin/AddUserPage";
import UserManager from "../Screens/Admin/UserManager";

function UserManagerLayout(
  USERS,
  CURRENT_USER,
  handleFilterUser,
  handleDeleteUser,
  handeResetFilter,
  handleAddUser,
  handleEditUser
) {
  const GetUserWithId = ({ match }) => {
    return (
      <AddUserPage
        handleEditUser={handleEditUser}
        user={USERS.filter(
          (user) => user._id === match.params.userId.toString()
        )}
      />
    );
  };

  return (
    <>
      <Route
        exact
        path="/admin/user"
        render={() => (
          <UserManager
            users={USERS}
            user={CURRENT_USER}
            handleFilterUser={handleFilterUser}
            handleDeleteUser={handleDeleteUser}
            handeResetFilter={handeResetFilter}
          />
        )}
      />
      <Route
        exact
        path="/admin/addUser"
        render={() => (
          <AddUserPage
            getAddUser={handleAddUser}
            handleAddUser={handleAddUser}
          />
        )}
      />
      <Route path="/admin/addUser/:userId" component={GetUserWithId} />
    </>
  );
}

export default UserManagerLayout;
