import React from "react";

function RangePasswordComponent(props) {
  const { status } = props;
  return (
    <div>
      <div className="rangePassword">
        <div className="rangePasswordDetail p-1">
          {status === "weak" ? (
            <>
              <span className="weak"></span>
              <span className="text">Yếu</span>
            </>
          ) : status === "medium" ? (
            <>
              <span className="weak"></span>
              <span className="medium"></span>
              <span className="text">Trung bình</span>
            </>
          ) : status === "strong" ? (
            <>
              <span className="weak"></span>
              <span className="medium"></span>
              <span className="strong"></span>
              <span className="text">Mạnh</span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default RangePasswordComponent;
