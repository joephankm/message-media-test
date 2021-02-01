import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ user }) {
  if (!user) return (
    <div className="avatar">
      <div className="no-user" />
      <div>No name</div>
    </div>
  );

  return (
    <div className="avatar">
      <img src={user.avatar_url} alt={user.display_name} />
      <div>{user.display_name || `@${user.username}`}</div>
    </div>
  );
}

Avatar.propTypes = {
  user: PropTypes.object,
};

Avatar.defaultProps = {
  user: null,
};

export default Avatar;
