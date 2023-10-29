import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { AiFillCloseCircle } from "react-icons/ai";


function CustomSelect({ options, onSelect, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    onSelect(selectedUsers);
  }, [selectedUsers, onSelect]);

  const handleOptionClick = (option) => {
    setSelectedUsers([...selectedUsers, option]);
    setSearchText("");
  };

  const handleDeleteUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
  };

  return (
    <div className="custom-select">
    
      <input
        type="text"
        value={searchText}
        placeholder="Add Users"
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />  <div className="selected-users">
        {selectedUsers.map((user) => (
          <div key={user.value} className="selected-user">
            {user.user_name}
            <span onClick={() => handleDeleteUser(user)}><AiFillCloseCircle/></span>
          </div>
        ))}
      </div>
      {isOpen && (
        <ul
          className="options"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {options
            .filter((option) => !selectedUsers.includes(option))
            .map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.user_name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CustomSelect;
