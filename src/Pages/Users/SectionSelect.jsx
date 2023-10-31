import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./select.css";
import { AiFillCloseCircle } from "react-icons/ai";

function SectionSelect({ options, onSelect, name }) {
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
        className="input"
        placeholder="Assign Section"
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />{" "}
      <div className="selected-users">
        {selectedUsers.map((user) => (
          <div key={user.id} className="selected-user">
            {user?.name}
            <span onClick={() => handleDeleteUser(user)}>
              <AiFillCloseCircle />
            </span>
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
              <li key={option.id} onClick={() => handleOptionClick(option)}>
                {option?.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

SectionSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SectionSelect;
