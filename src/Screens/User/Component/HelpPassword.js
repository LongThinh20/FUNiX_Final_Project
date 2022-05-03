import React from "react";

function HelpPassword(props) {
  const { showHelp, newPasswordStatus } = props;
  return (
    <div>
      {" "}
      <div id="newPasswordHelp" className={!showHelp ? "d-none" : "d-block"}>
        <div
          style={{ fontSize: "15px" }}
          className={`text-secondary p-1  ${
            newPasswordStatus === "medium" || newPasswordStatus === "strong"
              ? "text-success fw-bold "
              : newPasswordStatus === "weak"
              ? "text-success fw-bold "
              : ""
          }`}
        >
          Mật khẩu từ 8 ký tự{" "}
          <i
            className={`fa fa-check ${
              newPasswordStatus === "medium" ||
              newPasswordStatus === "weak" ||
              newPasswordStatus === "strong"
                ? ""
                : "d-none"
            }  `}
          ></i>
        </div>
        <div
          className={`text-secondary p-1  ${
            newPasswordStatus === "medium" || newPasswordStatus === "strong"
              ? "text-success fw-bold "
              : ""
          }`}
        >
          Mật khẩu từ 8 ký tự có chữ in hoa hoặc số hoặc chữ thường hoặc ký tự
          đặc biệt{" "}
          <i
            className={`fa fa-check ${
              newPasswordStatus === "medium" || newPasswordStatus === "strong"
                ? ""
                : "d-none"
            }  `}
          ></i>
        </div>
        <div
          className={`text-secondary p-1 ${
            newPasswordStatus === "strong" ? "text-success fw-bold " : ""
          }`}
        >
          Mật khẩu từ 8 ký tự có cả chữ in hoa , chữ thường , ký tự đặc biệt{" "}
          <i
            className={`fa fa-check ${
              newPasswordStatus === "strong" ? "" : "d-none"
            }  `}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default HelpPassword;
