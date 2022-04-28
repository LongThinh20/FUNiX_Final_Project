import React from "react";

function Home(props) {
  const { charities } = props;

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <div>
      <section style={{ height: "50rem", background: "gray" }}></section>
      <div className="container">
        <h4>Những chương trình từ thiện</h4>
        <div className="row">
          {charities.length > 0
            ? charities.map((charity) => (
                <div className="col-4" key={charity._id}>
                  <div className="card mb-4 " style={{ minHeight: "31rem" }}>
                    <img
                      src={`http://localhost:3001/${charity.image}`}
                      className="card-img-top"
                      alt={charity.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target={`#test${charity._id}`}
                          style={{ cursor: "pointer" }}
                        >
                          {charity.title}
                        </a>
                      </h5>
                      <div className=" row">
                        <span className="col">{charity.organization}</span>
                        <span className="col">Còn 20 ngày</span>
                      </div>
                      <div>
                        <span className="fw-bold text-secondary fs-5">
                          {formatNumber(charity.expectedMoney)}đ
                        </span>
                        <span className="text-secondary fs-5">
                          / {formatNumber(charity.expectedMoney)}đ
                        </span>
                      </div>
                      <div className="row">
                        <div className="col">
                          <span style={{ fontSize: "15px", color: "gray" }}>
                            Lượt quyên góp
                          </span>
                          <p className="fw-bold text-secondary">76</p>
                        </div>
                        <div className="col">
                          <span style={{ fontSize: "15px", color: "gray" }}>
                            Đạt được
                          </span>
                          <p className="fw-bold text-secondary">20%</p>
                        </div>
                        <div className="col">
                          <a
                            href="#"
                            className="btn btn-primary"
                            style={{ height: "40px" }}
                          >
                            Quyên góp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal " id={`test${charity._id}`}>
                    <div className="modal-dialog modal-xl modal-fullscreen-lg-down">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title">{charity.title}</h4>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <img
                            src={`http://localhost:3001/${charity.image}`}
                            className="card-img-top"
                            alt={charity.title}
                          />
                          <p>{charity.summary}</p>
                          {charity.content}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : "Không có dữ liệu"}
        </div>
      </div>
    </div>
  );
}

export default Home;
