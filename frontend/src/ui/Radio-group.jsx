// src/ui/Radio-group.jsx

export const RadioGroup = ({ value, onValueChange, children }) => {
  return (
    <div role="radiogroup" onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </div>
  );
};

export const RadioGroupItem = ({ id, value }) => {
  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      value={value}
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: "2px solid black", // black border
        accentColor: "black", // black fill when selected
        cursor: "pointer",
        outline: "none",
      }}
    />
  );
};
