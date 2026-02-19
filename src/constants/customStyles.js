export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    minWidth: "auto",
    borderRadius: "10px",
    color: "#000",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    border: "2px solid #EDEDED",
    boxShadow: "none",
    outline: "none",
    ":hover": {
      border: "2px solid #EDEDED",
      boxShadow: "none",
    },
    ":focus": {
      border: "2px solid #EDEDED",
      boxShadow: "none",
      outline: "none",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "4px 0px 4px 8px",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "#386AF6",
    padding: "4px 8px 4px 0px",
    transition: "transform 0.2s ease",
    ":hover": {
      color: "#386AF6",
      transform: "scale(1.2)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      paddingLeft: "12px",
      paddingRight: "12px",
      background: "#fff",
      backgroundImage: "linear-gradient(to right, transparent 0%, transparent 12px, #EDEDED 12px, #EDEDED calc(12px + 90%), transparent calc(12px + 90%))",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom left",
      backgroundSize: "100% 1px",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      width: "100%",
      maxWidth: "100%",
      border: "2px solid #EDEDED",
      borderRadius: "5px",
      boxShadow: "none",
      overflow: "hidden",
      zIndex: 9999,
    };
  },
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menuList: (styles) => ({
    ...styles,
    maxWidth: "100%",
    overflow: "auto",
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
  input: (styles) => ({
    ...styles,
    caretColor: "transparent",
  }),
};
